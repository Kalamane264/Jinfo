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

            try
            {
                Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);
                Pwi2.FolyamatBySiteIDResponse resp = await pwi2.FolyamatBySiteIDAsync(Convert.ToInt32(siteIDForAdmiral));

                if (resp.Body.FolyamatBySiteIDResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
                {
                    var folyamatList = resp.Body.FolyamatBySiteIDResult.List;
                    return new JsonResult(folyamatList);
                }
            }
            catch (Exception e)
            {
                throw (new Exception(e.ToString()));
            }

            return new JsonResult("");
        }

        [Route("api/KnowledgeBase/FolyamatAgListazasaFoFolyamatIDSzerint/{id}")]
        public async Task<JsonResult> FolyamatAgListazasaFoFolyamatIDSzerint(int id)
        {

            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);
            Pwi2.FolyamatAgListazasaFoFolyamatIDSzerintResponse resp = await pwi2.FolyamatAgListazasaFoFolyamatIDSzerintAsync(id);

            if (resp.Body.FolyamatAgListazasaFoFolyamatIDSzerintResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
            {
                var folyamatList = resp.Body.FolyamatAgListazasaFoFolyamatIDSzerintResult.List[0];
                return new JsonResult(folyamatList);
            }

            return new JsonResult("");
        }
    }
}
