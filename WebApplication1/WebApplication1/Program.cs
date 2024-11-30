using System.Text;
using System.Security.Claims;
using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models; // Import for Swagger
using Shab.Infrastructure.Extensions.DependencyInjection;
using Shab.Domain.Configs;
using Shab.Domain.Interfaces.Services;
using Shab.Domain.Interfaces.Mail;
using Shab.Infrastructure.Mail;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Shab.Api.Middleware;
using Shab.Application.Services;
using Shab.Application.Helpers;
using Shab.Infrastructure.Data;
using Shab.Api.Helpers;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin",
                builder => builder
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins("https://localhost:4200"));
        });

        // Add services to the container.
        builder.Services.AddControllersWithViews()
            .AddViewLocalization()
            .AddDataAnnotationsLocalization();

        builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

        var supportedCultures = new[]
        {
            new CultureInfo("en-US"),
            new CultureInfo("de-CH")
        };
        builder.Services.Configure<RequestLocalizationOptions>(options =>
        {
            options.DefaultRequestCulture = new RequestCulture("en-US");
            options.SupportedCultures = supportedCultures;
            options.SupportedUICultures = supportedCultures;
        });

        // Add Swagger services
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "My API",
                Version = "v1",
                Description = "API documentation for Shab application"
            });

            // Enable JWT in Swagger
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter token with Bearer prefix",
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
            });
            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                }
            });
        });

        builder.Services.AddShabDbContext();
        builder.Services.Configure<ConnectionStrings>(builder.Configuration.GetSection("ConnectionStrings"));
        builder.Services.Configure<SmtpDetails>(builder.Configuration.GetSection("SmtpDetails"));
        builder.Services.AddScoped<IBexioApiService, BexioApiService>();
        builder.Services.AddScoped<IEmailService, SmtpMailService>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        builder.Services.AddScoped<JwtTokenCreation>();
        builder.Services.AddScoped<PasswordHelper>();
        builder.Services.AddScoped<ShabDbContext>();
        builder.Services.AddScoped<JwtCreationFor2FA>();
        builder.Services.AddScoped<Encryption>();
        builder.Services.AddScoped<SetUpQrCode>();
        
        builder.Services.AddSession();

        var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings.Issuer,
                ValidAudience = jwtSettings.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
            };

            options.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
                    if (string.IsNullOrEmpty(token))
                    {
                        token = context.Request.Cookies["jwt"];
                    }
                    if (!string.IsNullOrEmpty(token))
                    {
                        context.Token = token;
                    }
                    return Task.CompletedTask;
                },
                OnChallenge = context =>
                {
                    context.Response.Redirect("/Home/Index");
                    context.HandleResponse();
                    return Task.CompletedTask;
                }
            };
        });

        builder.Services.AddAuthorization();

        var app = builder.Build();

        app.UseRequestLocalization(app.Services.GetRequiredService<IOptions<RequestLocalizationOptions>>().Value);

        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRequestLocalization();
        app.UseRouting();
        app.UseSession();

        app.Use(async (context, next) =>
        {
            var userLanguage = context.Session.GetString("userLanguage") ?? "en-US";
            var userCulture = new CultureInfo(userLanguage);
            var requestCulture = new RequestCulture(userCulture);
            CultureInfo.CurrentCulture = userCulture;
            CultureInfo.CurrentUICulture = userCulture;

            context.Features.Set<IRequestCultureFeature>(new RequestCultureFeature(requestCulture, null));
            await next.Invoke();
        });
        app.UseCors("AllowSpecificOrigin");
        app.UseAuthentication();
        app.UseAuthorization();

        // Enable Swagger middleware
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        });

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");

        app.Run();
    }
}
