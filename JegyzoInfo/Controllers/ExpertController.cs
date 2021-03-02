using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyzoInfo.Controllers
{
    public class ExpertController : Controller
    {
        [Route("api/Expert/GetSzakertoAdatokFullBySzakertoId/{id}")]
        public async Task<JsonResult> GetSzakertoAdatokFullBySzakertoId(int id)
        {
            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);
            Pwi2.SzakertoAdatokFullBySzakertoIdResponse resp = await pwi2.SzakertoAdatokFullBySzakertoIdAsync(id);

            if (resp.Body.SzakertoAdatokFullBySzakertoIdResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
            {
                var szaki = resp.Body.SzakertoAdatokFullBySzakertoIdResult.List[0];
                return new JsonResult(szaki);
            }

            return new JsonResult("");
        }
    }
}
