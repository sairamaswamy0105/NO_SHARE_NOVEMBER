using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Shab.Api.Middleware
{
    public class JwtTokenCreation
    {
        private readonly IConfiguration jwtSettings;
        public JwtTokenCreation(IConfiguration jwtSettings)
        {
            this.jwtSettings = jwtSettings;

        }
        public string GenerateJWTAuthetication(string userName, string role)
        {
            var claims = new List<Claim>
    {
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Name, userName),
                new Claim(ClaimTypes.Role, role)
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["JwtSettings:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings["JwtSettings:Issuer"],
                audience: jwtSettings["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(double.Parse(jwtSettings["JwtSettings:TokenLifetime"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
