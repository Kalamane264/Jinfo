using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyzoInfo.Controllers
{
    public class StatuteController : Controller
    {
        [Route("api/Statute/GetJogszabalySzovegJelenlegiDatumSzerint/{uid}")]
        public async Task<JsonResult> GetJogszabalySzovegJelenlegiDatumSzerint(string uid)
        {
            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);
            try
            {
                Pwi2.JogszabalySzovegJelenlegiDatumSzerintResponse resp = await pwi2.JogszabalySzovegJelenlegiDatumSzerintAsync(uid);
                if (resp.Body.JogszabalySzovegJelenlegiDatumSzerintResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
                {
                    var videos = resp.Body.JogszabalySzovegJelenlegiDatumSzerintResult.List;
                    return new JsonResult(videos);
                }
            }
            catch (Exception e)
            {

            }

            return new JsonResult("");
        }
    }
}
