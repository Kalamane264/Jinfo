using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyzoInfo.Controllers
{
    public class UserController : Controller
    {
        public bool Login()
        {
            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient();

            return true;
        }
    }
}
