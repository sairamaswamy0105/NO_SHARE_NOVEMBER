using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shab.Domain.Entities
{
    public class ContactEntity
    {
        public int? id { get; set; }
        [Required] public int contact_type_id { get; set; }
        [Required] public string name_1 { get; set; } = null!;
        public string? name_2 { get; set; }
        public string? address { get; set; }
        public string? postcode { get; set; }
        public string? city { get; set; }
        public string? mail { get; set; }
        public string? phone_mobile { get; set; }
        [Required] public int user_id { get; set; }
        [Required] public int owner_id { get; set; }
    }
}
