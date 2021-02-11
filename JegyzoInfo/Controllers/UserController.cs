using JegyzoInfo.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyzoInfo.Controllers
{
    [ApiController]
    public class UserController : Controller
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration) {
            this._configuration = configuration;
        }

        [HttpPost]
        [Route("api/User/Login")]
        public async Task<bool> Login(LoginVM loginVM)
        {
            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);

            var belepokod = loginVM.email;
            var jelszo = loginVM.password;
            var alkalmazas = _configuration["SiteCode"];

            Pwi2.FelhasznaloLoginResponse resp =  await pwi2.FelhasznaloLoginAsync(belepokod, jelszo, alkalmazas);
            if (resp.Body.FelhasznaloLoginResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
            {
                return true;
            }
            return false;
        }
    }
}
