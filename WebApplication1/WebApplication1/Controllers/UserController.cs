using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Shab.Domain.Entities;
using Shab.Domain.Interfaces.Mail;
using Shab.Domain.Interfaces.Services;
using Shab.Domain.Models.Services.User;
using Shab.Infrastructure.Data;
using Shab.Api.Helpers;
using static QRCoder.PayloadGenerator;

namespace shab.api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IBexioApiService _bexioApi;
        private readonly IUserService _userService;

        public UserController(IBexioApiService bexioApi,IUserService userService)
        {
            _bexioApi = bexioApi;
            _userService = userService;
        }

        [HttpGet]
        [Route("userdata")]
        public  ActionResult<List<UserEntity>> UserData()
        {
            return _userService.GetAllUser();
        }


        [HttpPost]
        [Route("create")]
        public async Task<ActionResult> createData(UserModel createdUser)
        {
            UserEntity userEntity =Conversion.ConvertToEntity(createdUser);

            List<string> mails = _userService.ListOfMails();
            if(mails.Contains(createdUser.Mail))
            {
                return BadRequest(new { message = "User with this email already exists." });
            }

            _userService.CreateUser(userEntity);
            return Json(new { message = "Created successfully" });
        }

        [HttpGet]
        [Route("roles")]
        public ActionResult<List<RoleEntity>> roles()
        {
            return _userService.GetAllRoles();
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<UserModel> getbyid(int? id)
        {
          UserEntity user = _userService.GetUserById(id);
            UserModel model = Conversion.ConvertToModel(user);
            return model;
        }


        [HttpPost]
        [Route("update")]
        public async Task<ActionResult> updateData(UserModel updatedUser)
        {
            List<string> mails = _userService.ListOfMails();
            UserEntity user = _userService.GetUserById(updatedUser.Id);
            if (mails.Contains(user.Mail))
            {
                return BadRequest(new { message = "User with this email already exists." });
            }
            UserEntity updatedUserEntity = Conversion.updateEntity(user, updatedUser);
            _userService.UpdateUser(updatedUserEntity);
            return Json(new { message = "updated successfully" });
        }

        [HttpPost]
        [Route("delete/{id}")]
        public async Task<ActionResult> deleteData(int id)
        {
            UserEntity deletedUserEntity = _userService.GetUserById(id);
            _userService.DeleteUser(deletedUserEntity);
            return Json(new { message = "Deleted successfully" });
        }
    }
}
