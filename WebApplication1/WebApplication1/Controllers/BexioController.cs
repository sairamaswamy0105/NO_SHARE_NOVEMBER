using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shab.Domain.Entities;
using Shab.Domain.Interfaces.Services;

namespace shab.api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BexioController : Controller
    {
        private readonly IBexioApiService _bexioApi;
        public BexioController(IBexioApiService bexioApi)
        {
            _bexioApi = bexioApi;
        }

        [HttpGet]
        [Route("bexiodata")]
        public async Task<ActionResult<List<ContactEntity>>> BexioData()
       {
            List<ContactEntity> contacts = await _bexioApi.FetchContacts();
            return contacts;
        }


        
    }
}
