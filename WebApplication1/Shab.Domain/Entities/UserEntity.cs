using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shab.Domain.Entities
{
    public class UserEntity
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; }
        public string Pincode { get; set; } = null!;
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? Mail { get; set; } = null!;
        public string Phone_Number { get; set; } = null!;
        public DateTime CreateDate { get; set; }
        public string? DateOfBirth { get; set; }

        public string? Password { get; set; }
        public string? PasswordResetToken { get; set; }
        public string Language { get; set; } = "de-CH";
        public int RoleId { get; set; } = 2;
        public RoleEntity? Role { get; set; }
        public string? UserImage { get; set; } = null;
        public string? TwoFactorSecretKey { get; set; }
    }
}
