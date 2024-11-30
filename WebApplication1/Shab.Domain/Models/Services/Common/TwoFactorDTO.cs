using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shab.Domain.Models.Services.Common
{
    public class TwoFactorDTO
    {
        public string Email { get; set; }
        public string Code { get; set; }
    }
}
