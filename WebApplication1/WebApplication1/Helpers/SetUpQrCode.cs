using Microsoft.AspNetCore.Mvc;
using OtpNet;
using QRCoder;
using Shab.Domain.Entities;
using Shab.Domain.Interfaces.Services;
using Shab.Domain.Models.Services.EmailTemplate;
using Shab.Infrastructure.Data;
using System.Text;
namespace Shab.Api.Helpers
{
    public class SetUpQrCode
    {
        private readonly string googleAuthenticatorKey;
        private readonly IUserService userService;
        public SetUpQrCode(IConfiguration configuration,IUserService userService)
        {
            googleAuthenticatorKey = configuration["googleAuthenticatorKey:key"];
            this.userService = userService;
        }

        public (string QRCodeData,string SecretKey) SetupTwoFactorAuthentication(UserEntity userEntity)
        {
            // Generate the first key (user-specific key)
            var userKey = KeyGeneration.GenerateRandomKey(20); // 20-byte random key for user
            var base32UserKey = Google.Authenticator.Base32Encoding.ToString(userKey); // Base32 encode

            // Second key (app-specific key from app settings)
            string appKey = googleAuthenticatorKey.ToUpper(); // Base32 key from app settings

            // Combine both keys (concatenation approach)
            string combinedKey = base32UserKey + appKey;

            // Base32 encode the combined key
            var combinedBase32Key = Google.Authenticator.Base32Encoding.ToString(Encoding.UTF8.GetBytes(combinedKey));

            // Save the combined Base32 key to the database
            userService.UpdateSecretKey(userEntity.Id, base32UserKey);
            //user.TwoFactorSecretKey = base32UserKey;
            //shabDbContext.SaveChanges();

            string issuer = "Shab";
            string title = $"{issuer} ({userEntity.FirstName} {userEntity.LastName})";
            string qrCodePayload = $"otpauth://totp/{Uri.EscapeDataString(title)}?secret={combinedBase32Key}&issuer={Uri.EscapeDataString(issuer)}";

            // Generate and return the QR code
            using (var qrGenerator = new QRCodeGenerator())
            {
                var qrCodeData = qrGenerator.CreateQrCode(qrCodePayload, QRCodeGenerator.ECCLevel.L);
                var qrCode = new Base64QRCode(qrCodeData);
                return ( qrCode.GetGraphic(20),combinedBase32Key );
            }
        }
    }
}
