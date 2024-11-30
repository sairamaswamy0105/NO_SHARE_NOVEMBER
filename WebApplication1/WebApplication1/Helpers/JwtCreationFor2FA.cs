using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Shab.Api.Helpers
{
    public class JwtCreationFor2FA
    {
        private readonly IConfiguration jwtSettings;
        public JwtCreationFor2FA(IConfiguration jwtSettings)
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
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
