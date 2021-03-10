using JegyzoInfo.Data;
using JegyzoInfo.DBModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyzoInfo.Controllers
{
    public class ContactController : Controller
    {
        [HttpPost]
        [Route("api/Contact/SaveMoreInfo")]
        public bool SaveMoreInfo([FromBody] Contact contact)
        {
            using DefaultContext ctx = new DefaultContext();
            ctx.Add(contact);
            ctx.SaveChanges();

            return true;
        }
    }
}
