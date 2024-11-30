using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shab.Domain.Configs
{
    public class SmtpDetails
    {
        public string TokenUrl { get; set; }
        public string Server { get; set; }
        public string Port { get; set; }
        public string SenderEmail { get; set; }
        public string SenderPassword { get; set; }
    }
}
