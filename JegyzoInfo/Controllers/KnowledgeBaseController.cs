using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyzoInfo.Controllers
{
    [ApiController]
    public class KnowledgeBaseController : Controller
    {
        private IConfiguration _configuration;

        public KnowledgeBaseController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        [Route("api/KnowledgeBase/GetFolyamats")]
        public async Task<JsonResult> GetFolyamats()
        {
            var siteIDForAdmiral = _configuration["SiteIDForAdmiral"];

            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);
            Pwi2.FolyamatBySiteIDResponse resp = await pwi2.FolyamatBySiteIDAsync(Convert.ToInt32(siteIDForAdmiral));

            if (resp.Body.FolyamatBySiteIDResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
            {
                var folyamatList = resp.Body.FolyamatBySiteIDResult.List;
                return new JsonResult(folyamatList);
            }

            return new JsonResult("");
        }
    }
}
