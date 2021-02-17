using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyzoInfo.Controllers
{
    public class ArticleController : Controller
    {
        private IConfiguration _configuration;

        public ArticleController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        [Route("api/Article/GetArticles")]
        public async Task<JsonResult> GetArticles()
        {
            var siteIDForAdmiral = _configuration["SiteIDForAdmiral"];

            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);
            Pwi2.CikkListBySiteIdResponse resp = await pwi2.CikkListBySiteIdAsync(Convert.ToInt32(siteIDForAdmiral));

            if (resp.Body.CikkListBySiteIdResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
            {
                var cikkList = resp.Body.CikkListBySiteIdResult.List;
                return new JsonResult(cikkList);
            }

            return new JsonResult("");
        }
    }
}
