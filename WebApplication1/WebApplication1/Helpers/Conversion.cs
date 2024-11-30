using Shab.Domain.Entities;
using Shab.Domain.Models.Services.User;

namespace Shab.Api.Helpers
{
    public static class Conversion
    {
        public static UserEntity ConvertToEntity(UserModel createdUser)
        {
            return new UserEntity
            {
                Id = (int)((createdUser.Id != 0) ? createdUser.Id : 0),
                FirstName = createdUser.FirstName,
                LastName = createdUser.LastName,
                Pincode = createdUser.Pincode,
                Street = createdUser.Street,
                City = createdUser.City,
                Mail = createdUser.Mail,
                Phone_Number = createdUser.Phone_Number,
                CreateDate = DateTime.Now,
                DateOfBirth = createdUser.DateOfBirth,
                Password = null,
                PasswordResetToken = Guid.NewGuid().ToString(),
                Language = createdUser.Language,
                RoleId = createdUser.RoleId,
                UserImage = createdUser.UserImage,
                TwoFactorSecretKey = createdUser.TwoFactorSecretKey,
            };
        }

        public static UserModel ConvertToModel(UserEntity userEntity)
        {
            return new UserModel
            {
                Id = userEntity.Id,
                FirstName = userEntity.FirstName,
                LastName = userEntity.LastName,
                Pincode = userEntity.Pincode,
                Street = userEntity.Street,
                City = userEntity.City,
                Mail = userEntity.Mail,
                Phone_Number = userEntity.Phone_Number,
                DateOfBirth = userEntity.DateOfBirth,
                Language = userEntity.Language,
                RoleId = userEntity.RoleId,
                UserImage=userEntity.UserImage,
                TwoFactorSecretKey=userEntity.TwoFactorSecretKey,
            };
        }

        public static UserEntity updateEntity(UserEntity userEntity,UserModel userModel)
        {
            userEntity.FirstName = userModel.FirstName;
            userEntity.LastName = userModel.LastName;
            userEntity.Pincode = userModel.Pincode;
            userEntity.Street = userModel.Street;
            userEntity.City = userModel.City;
            userEntity.Mail = userModel.Mail;
            userEntity.Phone_Number = userModel.Phone_Number;
            userEntity.DateOfBirth = userModel.DateOfBirth;
            userEntity.Language = userModel.Language;
            userEntity.RoleId = userModel.RoleId;
            userEntity.UserImage = userModel.UserImage;
            return userEntity;
        }

    }
}
