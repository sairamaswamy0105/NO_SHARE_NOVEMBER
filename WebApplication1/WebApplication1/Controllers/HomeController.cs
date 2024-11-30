using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OtpNet;
using QRCoder;
using Shab.Api.Middleware;
using Shab.Application.Helpers;
using Shab.Domain.Entities;
using Shab.Domain.Interfaces.Mail;
using Shab.Domain.Models.Services.Common;
using Shab.Domain.Models.Services.EmailTemplate;
using Shab.Domain.Models.Services.Password;
using Shab.Domain.Models.Services.User;
using Shab.Infrastructure.Data;
using Google.Authenticator;
using System.Text;
using Shab.Api.Helpers;

namespace shab.api.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private readonly ShabDbContext shabDbContext;
        private readonly JwtTokenCreation _tokenService;
        private readonly PasswordHelper passwordHelper;
        private readonly IEmailService _emailService;
        private readonly string googleAuthenticatorKey;
        private readonly JwtCreationFor2FA jwtCreationFor2FA;
        private readonly Encryption encryption;
        private readonly SetUpQrCode setUpQrCode;
        public HomeController(IEmailService emailService,ShabDbContext shabDbContext, JwtTokenCreation tokenService, PasswordHelper passwordHelper,IConfiguration configuration, JwtCreationFor2FA jwtCreationFor2FA, Encryption encryption,SetUpQrCode setUpQrCode)
        {
            this.shabDbContext = shabDbContext;
            _tokenService = tokenService;
            this.passwordHelper = passwordHelper;
            _emailService = emailService;
            googleAuthenticatorKey= configuration["googleAuthenticatorKey:key"];
            this.jwtCreationFor2FA = jwtCreationFor2FA;
            this.encryption = encryption;
            this.setUpQrCode = setUpQrCode;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTOModel>> Login(LoginDTOModel loginDTOModel)
        {
            var qrCode = "";
            var secretKey = "";
            UserEntity user = await shabDbContext.users.SingleOrDefaultAsync(u => u.Mail == loginDTOModel.Email);
            if (user == null || user.Password==null) return BadRequest(new { message = "User Not Found" });
            if(!passwordHelper.VerifyPassword(user.Password,loginDTOModel.Password))
            {
                return Unauthorized(new { message = "Invalid Password" });
            }
            string roleName = shabDbContext.roles.Find(user.RoleId).Name;
            if(user.TwoFactorSecretKey==null)
            {
               var qrCodeDataAndKey= setUpQrCode.SetupTwoFactorAuthentication(user);
                qrCode = qrCodeDataAndKey.QRCodeData;
                secretKey= qrCodeDataAndKey.SecretKey;
            }
            return new UserDTOModel
            {
                
                UserName = user.Mail,
                Token = _tokenService.GenerateJWTAuthetication(user.FirstName, roleName),
                Language=user.Language,
                QrCode=qrCode,
                SecretKey=secretKey,
            };
        }
        [HttpPost("forgot")]
        public async Task<ActionResult> ForgotPassword(EmailDto emailModel)
        {
            UserEntity user = await shabDbContext.users.SingleOrDefaultAsync(u => u.Mail == emailModel.email);
            if (user == null)
                return NotFound(new { message = "User not found" });
            user.PasswordResetToken = Guid.NewGuid().ToString();
            await shabDbContext.SaveChangesAsync();
            _emailService.SendEmailAsync(user, "update");
            return Json(new { message = "Password Reset link send to your Mail" });
        }
        [HttpPost("tokenverify")]
        public async Task<bool> TokenVerify([FromBody] TokenGuid? tokenGuid)
        {
            if (tokenGuid == null || string.IsNullOrEmpty(tokenGuid?.token))
            {
                return false;
            }

            UserEntity user = await shabDbContext.users.SingleOrDefaultAsync(u => u.PasswordResetToken == tokenGuid.token);

            if (user == null)
            {
                return false ;
            }

            return true;
        }
        [HttpPost("setpassword")]
        public async Task<ActionResult> SetPassword(PasswordModel passwordModel)
        {
            UserEntity user = await shabDbContext.users.SingleOrDefaultAsync(u => u.PasswordResetToken == passwordModel.Token);
            user.Password= passwordHelper.SetPassword(passwordModel.Password);
            user.PasswordResetToken = null;
            await shabDbContext.SaveChangesAsync(); 
            return Ok();

        }



        //[HttpPost("setup-2fa")]
        //public IActionResult SetupTwoFactorAuthentication(EmailDto emailDto)
        //{
        //    var user = shabDbContext.users.SingleOrDefault(u => u.Mail == emailDto.email);

        //    if (user == null)
        //    {
        //        return NotFound(new { message = "User not found" });
        //    }

        //    if (!string.IsNullOrEmpty(user.TwoFactorSecretKey))
        //    {
        //        return Ok(true);
        //    }

        //    // Generate the first key (user-specific key)
        //    var userKey = KeyGeneration.GenerateRandomKey(20); // 20-byte random key for user
        //    var base32UserKey = Google.Authenticator.Base32Encoding.ToString(userKey); // Base32 encode

        //    // Second key (app-specific key from app settings)
        //    string appKey = googleAuthenticatorKey.ToUpper(); // Base32 key from app settings

        //    // Combine both keys (concatenation approach)
        //    string combinedKey = base32UserKey + appKey;

        //    // Base32 encode the combined key
        //    var combinedBase32Key = Google.Authenticator.Base32Encoding.ToString(Encoding.UTF8.GetBytes(combinedKey));

        //    // Save the combined Base32 key to the database
        //    user.TwoFactorSecretKey = base32UserKey;
        //    shabDbContext.SaveChanges();

        //    string issuer = "Shab";
        //    string title = $"{issuer} ({emailDto.email})";
        //    string qrCodePayload = $"otpauth://totp/{Uri.EscapeDataString(title)}?secret={combinedBase32Key}&issuer={Uri.EscapeDataString(issuer)}";

        //    // Generate and return the QR code
        //    using (var qrGenerator = new QRCodeGenerator())
        //    {
        //        var qrCodeData = qrGenerator.CreateQrCode(qrCodePayload, QRCodeGenerator.ECCLevel.L);
        //        var qrCode = new Base64QRCode(qrCodeData);
        //        return Ok(new { qrCodeUrl = qrCode.GetGraphic(20), manualEntryKey = combinedBase32Key });
        //    }
        //}



        [HttpPost("verify-2fa")]
        public ActionResult<TokenDTO> VerifyTwoFactorAuthentication(TwoFactorDTO twoFactorDTO)
        {
            var user = shabDbContext.users.SingleOrDefault(u => u.Mail == twoFactorDTO.Email);
            if (user == null || string.IsNullOrEmpty(user.TwoFactorSecretKey))
            {
                return BadRequest("User not found or 2FA not set up.");
            }

            var key1 = user.TwoFactorSecretKey;
            var key2 = googleAuthenticatorKey.ToUpper();
            var totalkey=key1+ key2;

            var combinedBase32Key = Google.Authenticator.Base32Encoding.ToString(Encoding.UTF8.GetBytes(totalkey));
            var combinedKeyBytes = Google.Authenticator.Base32Encoding.ToBytes(combinedBase32Key);
            var authenticator = new TwoFactorAuthenticator();
            bool isValid = authenticator.ValidateTwoFactorPIN(combinedKeyBytes, twoFactorDTO.Code, 0);// No time tolerance
            var data1 = encryption.Encrypt(DateTime.Now.ToString());
            var data2 = encryption.Encrypt(user.Mail);

            var jwtToken= jwtCreationFor2FA.GenerateJWTAuthetication(data1, data2);
            if (isValid)
            {
                return new TokenDTO { Token = jwtToken };
            }
            else
            {
                return BadRequest(new { message = "Invalid 2FA code." });
            }
        }
       



    }
}
