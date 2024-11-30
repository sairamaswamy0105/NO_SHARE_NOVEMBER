using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Shab.Domain.Configs;
using Shab.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shab.Infrastructure.Extensions.DependencyInjection
{
    public static class DbContextServiceCollectionExtensions
    {
        public static void AddShabDbContext(this IServiceCollection services)
        {
            // Build the service provider to access configuration
            var serviceProvider = services.BuildServiceProvider();
            var configuration = serviceProvider.GetRequiredService<IConfiguration>();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<ShabDbContext>(options =>
                options.UseSqlServer(connectionString));

        }
    }
}
