using JegyzoInfo.Managers;
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
        private readonly IConfiguration _configuration;

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

        [Route("api/Article/GetArticle/{id}")]
        public async Task<JsonResult> GetArticle(int id)
        {
            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);
            Pwi2.CikkListBySiteFullResponse resp = await pwi2.CikkListBySiteFullAsync(id);

            if (resp.Body.CikkListBySiteFullResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
            {
                var cikk = resp.Body.CikkListBySiteFullResult.List[0];
                return new JsonResult(cikk);
            }

            return new JsonResult("");
        }

        [Route("api/Article/GetArticleBySeoUrl/{id}")]
        public async Task<JsonResult> GetArticleBySeoUrl(string id)
        {
            Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);
            Pwi2.CikkFullBySEOUrlResponse resp = await pwi2.CikkFullBySEOUrlAsync(id);

            if (resp.Body.CikkFullBySEOUrlResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
            {
                var cikk = resp.Body.CikkFullBySEOUrlResult.List[0];
                var articlemanager = new ArticleManager();
                cikk.Tartalom = await articlemanager.KapcsCikkReplace(cikk.Tartalom);
                return new JsonResult(cikk);
            }

            return new JsonResult("");
        }
    }
}
