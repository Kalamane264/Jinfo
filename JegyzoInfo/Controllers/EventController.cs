using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyzoInfo.Controllers
{
    public class EventController : Controller
    {
        private IConfiguration _configuration;

        public EventController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        [Route("api/Courses/EsemenyList")]
        public async Task<JsonResult> EsemenyList()
        {
            var siteIDForAdmiral = _configuration["SiteIDForAdmiral"];

            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);
            Pwi2.EsemenyListBySiteIdResponse resp = await pwi2.EsemenyListBySiteIdAsync(Convert.ToInt32(siteIDForAdmiral));

            if (resp.Body.EsemenyListBySiteIdResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
            {
                var cikkList = resp.Body.EsemenyListBySiteIdResult.List;
                return new JsonResult(cikkList);
            }

            return new JsonResult("");
        }
    }
}
