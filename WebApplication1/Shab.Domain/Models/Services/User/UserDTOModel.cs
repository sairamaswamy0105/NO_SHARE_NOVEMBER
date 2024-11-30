using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shab.Domain.Models.Services.User
{
    public class UserDTOModel
    {
        [Required]
        public string UserName { get; set; } = null!;
        [Required]
        public string Token { get; set; } = null!;
        [Required]
        public string Language { get; set; } = null!;
        public string? QrCode { get; set; }
        public string? SecretKey { get; set; }

    }
}
