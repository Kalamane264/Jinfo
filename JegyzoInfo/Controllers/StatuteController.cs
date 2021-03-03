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
                Pwi2.JogszabalySzovegJelenlegiDatumSzerintResponse resp = await pwi2.JogszabalySzovegJelenlegiDatumSzerintAsync(uid, true);
                if (resp.Body.JogszabalySzovegJelenlegiDatumSzerintResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
                {
                    var jsz = resp.Body.JogszabalySzovegJelenlegiDatumSzerintResult.List;
                    return new JsonResult(jsz);
                }
            }
            catch (Exception e)
            {

            }

            return new JsonResult("");
        }

        [Route("api/Statute/GetJogszabalySzovegHTMLJelenlegiDatumSzerint/{uid}")]
        public async Task<JsonResult> GetJogszabalySzovegHTMLJelenlegiDatumSzerint(string uid)
        {
            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);
            try
            {
                Pwi2.JogszabalySzovegHTMLJelenlegiDatumSzerintResponse resp = await pwi2.JogszabalySzovegHTMLJelenlegiDatumSzerintAsync(uid);
                if (resp.Body.JogszabalySzovegHTMLJelenlegiDatumSzerintResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
                {
                    var jsz = resp.Body.JogszabalySzovegHTMLJelenlegiDatumSzerintResult.List[0];
                    return new JsonResult(jsz);
                }
            }
            catch (Exception e)
            {

            }

            return new JsonResult("");
        }
    }
}
