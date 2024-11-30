using Microsoft.EntityFrameworkCore;
using Shab.Domain.Entities;
using Shab.Domain.Interfaces.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shab.Infrastructure.Data
{
    public class ShabDbContext : DbContext,IShabDbContext
    {
        public ShabDbContext(DbContextOptions<ShabDbContext> options) : base(options)
        {
        }
        public DbSet<UserEntity> users { get; set; }
        public DbSet<RoleEntity> roles { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            UserEntity user1 = new UserEntity { Id = 1, FirstName = "Sai", LastName = "Ram", Pincode = "533016", Street = "Market Road", City = "Kakinada", Mail = "sairamswamy0105@gmail.com", Phone_Number = "+917569373620", DateOfBirth = null, Password = null };
            user1.CreateDate = DateTime.Now;
            user1.PasswordResetToken = Guid.NewGuid().ToString();
            UserEntity user2 = new UserEntity { Id = 2, FirstName = "Muka", LastName = "Ambika", Pincode = "533048", Street = "Burma Colony", City = "Visakhapatnam", Mail = "mukaambika@gmail.com", Phone_Number = "+918897070200", DateOfBirth = null, Password = null };
            user2.CreateDate = DateTime.Now;
            user2.PasswordResetToken = Guid.NewGuid().ToString();
            UserEntity user3 = new UserEntity { Id = 3, FirstName = "Kartik", LastName = "Kanchi", Pincode = "533048", Street = " RTC Complex", City = "Blore", Mail = "skram0905@gmail.com", Phone_Number = "+918897070200", DateOfBirth = null, Password = null, RoleId = 2 };
            user3.CreateDate = DateTime.Now;
            user3.PasswordResetToken = Guid.NewGuid().ToString();
            modelBuilder.Entity<UserEntity>().HasData(
                user1, user2, user3
                );
            modelBuilder.Entity<RoleEntity>().HasData(
            new RoleEntity { Id = 1, Name = "Admin" },
            new RoleEntity { Id = 2, Name = "User" }
        );

            // Set default language and role for existing users
            modelBuilder.Entity<UserEntity>().Property(u => u.Language).HasDefaultValue("de-CH");
            modelBuilder.Entity<UserEntity>().Property(u => u.RoleId).HasDefaultValue(1); // Default to Admin
        }
    }
}
