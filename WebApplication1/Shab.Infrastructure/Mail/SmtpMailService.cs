using Shab.Domain.Entities;
using Shab.Domain.Interfaces.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Shab.Domain.Configs;

namespace Shab.Infrastructure.Mail
{
    public class SmtpMailService : IEmailService
    {

        private readonly string _tokenUrl;
        private readonly string _server;
        private readonly string _port;
        private readonly string _senderEmail;
        private readonly string _senderPassword;
        public SmtpMailService(IOptions<SmtpDetails> details)
        {
            _tokenUrl = details.Value.TokenUrl;
            _server = details.Value.Server;
            _port = details.Value.Port;
            _senderEmail = details.Value.SenderEmail;
            _senderPassword = details.Value.SenderPassword;
        }

        public void SendEmailAsync(UserEntity user, string text)
        {
            string tokenUrl = $"{_tokenUrl}{user.PasswordResetToken}&text={text}";
            string emailBody = $"Hello {user.FirstName},<br/><br/>Please set your password by clicking the following link: <a href='{tokenUrl}'>To Set Password Click Here</a>";
            var mail = _senderEmail;
            var pw = _senderPassword;

            var mailMessage = new MailMessage
            {
                From = new MailAddress(mail),
                Subject = "Set the password",
                Body = emailBody,
                IsBodyHtml = true
            };
            mailMessage.To.Add(new MailAddress(user.Mail));
            var smtp = new SmtpClient(_server, int.Parse(_port))
            {
                Credentials = new NetworkCredential(mail, pw),
                EnableSsl = true
            };
            smtp.Send(mailMessage);
        }
    }
}
