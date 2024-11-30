using Microsoft.EntityFrameworkCore;
using Shab.Domain.Entities;
using Shab.Domain.Interfaces.Mail;
using Shab.Domain.Interfaces.Services;
using Shab.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shab.Application.Services
{
    public class UserService : IUserService
    {
        private readonly ShabDbContext _shabDbContext;
        private readonly IEmailService _emailService;
        public UserService(ShabDbContext shabDbContext, IEmailService emailService)
        {

            _shabDbContext = shabDbContext;
            _emailService = emailService;
         }
        public void CreateUser(UserEntity userEntity)
        {
            _shabDbContext.users.Add(userEntity);
            _shabDbContext.SaveChanges();
            _emailService.SendEmailAsync(userEntity, "create");
        }

        public void DeleteUser(UserEntity deletedUserEntity)
        {
            _shabDbContext.users.Remove(deletedUserEntity);
            _shabDbContext.SaveChanges();
        }

        public List<RoleEntity> GetAllRoles()
        {
            return _shabDbContext.roles.ToList();
        }

        public List<UserEntity> GetAllUser()
        {
            return _shabDbContext.users.ToList();
        }

        public UserEntity GetUserById(int? id)
        {
            return _shabDbContext.users.Find(id);
        }

        public List<string> ListOfMails()
        {
            return _shabDbContext.users.AsNoTracking().Select(u => u.Mail).ToList();
        }

        public void UpdateSecretKey(int id,string SecretKey)
        {
            UserEntity userNeedToBeUpdateKey=_shabDbContext.users.Find(id);
            userNeedToBeUpdateKey.TwoFactorSecretKey = SecretKey;
            _shabDbContext.SaveChanges();
        }

        public void UpdateUser(UserEntity updatedUserEntity)
        {
            _shabDbContext.users.Update(updatedUserEntity);
            _shabDbContext.SaveChanges();
        }
    }
}
