using JegyzoInfo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyzoInfo.Controllers
{
    public class CategoryController : Controller
    {
        private IConfiguration _configuration;

        public CategoryController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        [Route("api/Category/KategoriaV2sBySiteID")]
        public async Task<JsonResult> KategoriaV2sBySiteID()
        {
            var siteIDForAdmiral = _configuration["SiteIDForAdmiral"];

            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);
            Pwi2.KategoriaV2sBySiteIDResponse resp = await pwi2.KategoriaV2sBySiteIDAsync(Convert.ToInt32(siteIDForAdmiral));

            if (resp.Body.KategoriaV2sBySiteIDResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
            {
                var cats = resp.Body.KategoriaV2sBySiteIDResult.List;
                return new JsonResult(cats);
            }

            return new JsonResult("");
        }

        [HttpPost]
        [Route("api/Category/LegfrissebbCikkekBySiteIDandFirstCikkIDandKategoriaV2IDs")]
        public async Task<JsonResult> LegfrissebbCikkekBySiteIDandFirstCikkIDandKategoriaV2IDs([FromBody] CikksByCatsVM vm)
        {
            var siteIDForAdmiral = _configuration["SiteIDForAdmiral"];

            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);
            Pwi2.LegfrissebbCikkekBySiteIDandFirstCikkIDandKategoriaV2IDsResponse resp = 
                await pwi2.LegfrissebbCikkekBySiteIDandFirstCikkIDandKategoriaV2IDsAsync(Convert.ToInt32(siteIDForAdmiral), vm.Max, vm.Tol, vm.Kategoriav2ids);

            if (resp.Body.LegfrissebbCikkekBySiteIDandFirstCikkIDandKategoriaV2IDsResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
            {
                var cikks = resp.Body.LegfrissebbCikkekBySiteIDandFirstCikkIDandKategoriaV2IDsResult.List;
                return new JsonResult(cikks);
            }

            return new JsonResult("");
        }

        
        [Route("api/Category/CikkFullBySEOUrlAndSiteID/{seourl}")]
        public async Task<JsonResult> CikkFullBySEOUrlAndSiteID(string seourl)
        {
            var siteIDForAdmiral = _configuration["SiteIDForAdmiral"];

            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);
            Pwi2.CikkFullBySEOUrlAndSiteIDResponse resp =
                await pwi2.CikkFullBySEOUrlAndSiteIDAsync(seourl, Convert.ToInt32(siteIDForAdmiral));

            if (resp.Body.CikkFullBySEOUrlAndSiteIDResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
            {
                var cikks = resp.Body.CikkFullBySEOUrlAndSiteIDResult.List[0];
                return new JsonResult(cikks);
            }

            return new JsonResult("");
        }
    }
}
