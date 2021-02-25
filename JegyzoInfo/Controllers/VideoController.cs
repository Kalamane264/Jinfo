using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyzoInfo.Controllers
{
    public class VideoController : Controller
    {
        private IConfiguration _configuration;

        public VideoController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        [Route("api/GetLegfrissebbVideokBySiteID/{id}")]
        public async Task<JsonResult> GetLegfrissebbVideokBySiteID(int id)
        {
            var siteIDForAdmiral = _configuration["SiteIDForAdmiral"];

            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);
            Pwi2.LegfrissebbVideokBySiteIDResponse resp = await pwi2.LegfrissebbVideokBySiteIDAsync(Convert.ToInt32(siteIDForAdmiral), id);

            if (resp.Body.LegfrissebbVideokBySiteIDResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
            {
                var videos = resp.Body.LegfrissebbVideokBySiteIDResult.List;
                return new JsonResult(videos);
            }

            return new JsonResult("");
        }
    }
}
