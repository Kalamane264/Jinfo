using JegyzoInfo.DBModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyzoInfo.Data
{
    public class DefaultContext: DbContext
    {
        public DbSet<Contact> Contacts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=mssql.mprx.hu,2400;Database=Jegyzoinfo;UID=jegyzoinf772#H;Pwd=$4#Qx55wj037;TrustServerCertificate=Yes;Encrypt=Yes;");
        }
    }
}
