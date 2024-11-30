using Microsoft.AspNetCore.Http;

namespace Shab.Domain.Models.Services.User
{
    public class UserModel
    {
        public int? Id { get; set; } = 0;
        public string FirstName { get; set; } = null!;
        public string? LastName { get; set; }
        public string Pincode { get; set; } = null!;
        public string? Street { get; set; }
        public string? City { get; set; }
        public string Mail { get; set; } = null!;
        public string Phone_Number { get; set; } = null!;
        public string? DateOfBirth { get; set; }
        public string Language { get; set; } = null!;
        public int RoleId { get; set; } = 2;
        public string? UserImage { get; set; } = null;
        public string? TwoFactorSecretKey { get; set; }
    }
}
