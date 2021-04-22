using JegyzoInfo.Models;
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
        public static int bereczErikaCRMID = 32824;

        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration) {
            this._configuration = configuration;
        }

        [HttpPost]
        [Route("api/User/Login")]
        public async Task<User> Login(LoginVM loginVM)
        {
            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);

            var belepokod = loginVM.email;
            var jelszo = loginVM.password;
            var alkalmazas = _configuration["SiteCode"];

            Pwi2.FelhasznaloLoginResponse resp =  await pwi2.FelhasznaloLoginAsync(belepokod, jelszo, alkalmazas);
            if (resp.Body.FelhasznaloLoginResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
            {
                var userResp = resp.Body.FelhasznaloLoginResult.List[0];
                var user = new User
                {
                    FelhasznaloID = userResp.FelhasznaloID,
                    Email = userResp.Email,
                    Nev = userResp.Nev
                };
                return user;
            }
            return null;
        }

        [Route("api/User/PasswordReminder/{email}")]
        public async Task<bool> PasswordReminder(string email)
        {
            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);

            Pwi2.JelszoEmlekeztetoResponse resp = await pwi2.JelszoEmlekeztetoAsync(email, "NO");
            if (resp.Body.JelszoEmlekeztetoResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
            {
                return true;
            }
            return false;
        }

        [Route("api/User/GetDiakByUserID/{userId}")]
        public async Task<JsonResult> GetDiakByUserID(int userId)
        {
            PWI1.PWIServiceSoapClient pwi = new PWI1.PWIServiceSoapClient(PWI1.PWIServiceSoapClient.EndpointConfiguration.PWIServiceSoap12);

            PWI1.GetDiakByUserIDResponse resp = await pwi.GetDiakByUserIDAsync(userId);
            if (resp.Body.GetDiakByUserIDResult.ErrorCode == PWI1.PWIErrorCode.NoError)
            {
                var diak = resp.Body.GetDiakByUserIDResult.Params;
                return new JsonResult(diak);
            }
            return new JsonResult(false);
        }

        [Route("api/User/FelhasznalohozKapcsolodoDiakok/{userId}")]
        public async Task<JsonResult> FelhasznalohozKapcsolodoDiakok(int userId)
        {

            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);
            Pwi2.FelhasznalohozKapcsolodoDiakokResponse resp = await pwi2.FelhasznalohozKapcsolodoDiakokAsync(userId);

            if (resp.Body.FelhasznalohozKapcsolodoDiakokResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
            {
                var diakok = resp.Body.FelhasznalohozKapcsolodoDiakokResult.List;
                return new JsonResult(diakok);
            }

            return new JsonResult(false);
        }

        [HttpPost]
        [Route("api/User/KepzesJelentkezes")]
        public async Task<bool> KepzesJelentkezes(JelentkezesVM jelentkezes)
        {
            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);

            var modositas = jelentkezes.iD_DIAK > 0 ? true : false;

            Pwi2.KepzesJelentkezesResponse resp = await pwi2.KepzesJelentkezesAsync(
                jelentkezes.felhasznaloID,
                jelentkezes.iD_DIAK,
                jelentkezes.kepzesId,
                modositas,
                jelentkezes.elonev,
                jelentkezes.vezeteknev,
                jelentkezes.keresztnev,
                jelentkezes.szuletesinev,
                jelentkezes.anyjaneve,
                jelentkezes.szulhely,
                jelentkezes.szulEv,
                jelentkezes.szulHonap,
                jelentkezes.szulNap,
                jelentkezes.adoszam,
                jelentkezes.email,
                jelentkezes.telefoN1,
                jelentkezes.vegzettseg
                );

            if (resp.Body.KepzesJelentkezesResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
            {
                return true;
            }
            else
            {
                throw new Exception(resp.Body.KepzesJelentkezesResult.ErrorText);
            }
        }

        [HttpPost]
        [Route("api/User/Kerdes")]
        public async Task<bool> Kerdes(KerdesVM kerdes)
        {
            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);
            var SiteCode = _configuration["SiteCode"];

            await pwi2.FeladatSzakertoInsertAsync(kerdes.felhasznaloID, kerdes.kerdes, SiteCode, "", "Jegyzőinfó V2 kérdés", 0, bereczErikaCRMID, 0, 0);

            return true;
        }
    }
}
