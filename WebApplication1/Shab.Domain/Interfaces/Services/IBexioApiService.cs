using Shab.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shab.Domain.Interfaces.Services
{
    public interface IBexioApiService
    {
        Task<List<ContactEntity>> FetchContacts();
    }
}
