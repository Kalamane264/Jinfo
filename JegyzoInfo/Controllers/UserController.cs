using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyzoInfo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration) {
            this._configuration = configuration;
        }
        public bool Login(string email, string password)
        {
            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);

            var belepokod = email;
            var jelszo = password;
            var alkalmazas = _configuration["SiteCode"];

            var resp =  pwi2.FelhasznaloLoginAsync(belepokod, jelszo, alkalmazas);

            return true;
        }
    }
}
