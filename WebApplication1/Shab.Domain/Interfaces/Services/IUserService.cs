using Shab.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shab.Domain.Interfaces.Services
{
    public interface IUserService
    {
        public List<UserEntity> GetAllUser();
        public List<string> ListOfMails();
        public void CreateUser(UserEntity user);
        public void UpdateUser(UserEntity user);
        public void DeleteUser(UserEntity user);
        public UserEntity GetUserById(int? id);
        public List<RoleEntity> GetAllRoles();
        public void UpdateSecretKey(int id, string SecretKey);
    }
}
