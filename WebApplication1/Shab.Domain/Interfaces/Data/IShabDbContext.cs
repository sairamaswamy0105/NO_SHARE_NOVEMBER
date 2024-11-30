using Microsoft.EntityFrameworkCore;
using Shab.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shab.Domain.Interfaces.Data
{
    public interface IShabDbContext
    {
        public DbSet<UserEntity> users { get; set; }
        public DbSet<RoleEntity> roles { get; set; }

    }
}
