using JegyzoInfo.Models;
using Pwi2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;



namespace JegyzoInfo.Managers
{
    public class ArticleManager
    {
        public async Task<string> KapcsCikkReplace(string tartalom)
        {
			Pwi2.WSSoapClient pwi2 = new Pwi2.WSSoapClient(Pwi2.WSSoapClient.EndpointConfiguration.WSSoap12);

			Regex rx = new Regex(@"\[\*?KAPCS CIKK_ID=[*].+?[*] UTM=[*].+?[*] KAPCS\*?\]", RegexOptions.Compiled | RegexOptions.IgnoreCase);
			MatchCollection matches = rx.Matches(tartalom);
			List<KapcsolodoCikk> kapcsolodoCikks = new List<KapcsolodoCikk>();
			string szovegdoboz = "<div class='linkpreview bekezdes_utan'> <a href='*CIKKURL*' target='_self'> <div class='linkpreview_header'>Kapcsolódó</div> <div class='linkpreview_box '> <div class='linkpreview_box_imgcont'> <div class='linkpreview_box_imgcont_img'><img src='*KEPURL*'; alt='*KEPALTAG*'></div> </div> <div class='linkpreview_box_textcont'> <div class='linkpreview_box_textcont_text'> <h2 class='linkpreview_box_textcont_text_hl'><a href='*CIKKURL*' target='_self'> *SEOTITLE* </a></h2> <p class='linkpreview_box_textcont_text_lead'> *LEAD2* </p> </div> </div> </div> </a> </div>";

			szovegdoboz =
				"<a href='*CIKKURL*'>" +
					"<div class=\"offer\">" +
					  "<div class=\"top\">" +
						"ÖNNEK AJÁNLJUK" +
					  "</div>" +
					  "<div class=\"bottom\">" +
						"<div class=\"leftSide\">" +
						  "<h5>" +
							"*CIM*" +
						  "</h5>" +
						  "<p>" +
							"*BEVEZETO*" +
						  "</p>" +
						"</div>" +
						"<div class=\"rightSide\">" +
						  "<img src = '*KEPURL*' alt='*KEPALTAG*'>" +
						"</div>" +
					  "</div>" +
					"</div>" +
				"</a>";

			foreach (Match match in matches)
			{
				GroupCollection groups = match.Groups;
				int startindex = groups[0].Value.IndexOf("CIKK_ID=*");
				int endindex = groups[0].Value.IndexOf("* UTM=*");
				string temp = groups[0].Value.Substring(startindex, endindex - startindex);
				temp = temp.Substring(temp.IndexOf('*') + 1);
				int cikkid = Convert.ToInt32(temp);
				startindex = groups[0].Value.IndexOf("UTM=*");
				endindex = groups[0].Value.IndexOf("* KAPCS*]");
				temp = groups[0].Value.Substring(startindex, endindex - startindex);
				temp = temp.Substring(temp.IndexOf('*') + 1);
				string utm = temp;
				kapcsolodoCikks.Add(new KapcsolodoCikk() { Original = groups[0].Value, Cikk_ID = cikkid, UTM = utm });
			}
			if (kapcsolodoCikks.Count != 0)
			{
				foreach (KapcsolodoCikk kapcsolodoCikk in kapcsolodoCikks)
				{
					// var currentcikk = wcms.Cikk.Where(x => x.CikkID == kapcsolodoCikk.Cikk_ID).FirstOrDefault();
					cikk currentcikk = new cikk();
					Pwi2.CikkListBySiteFullResponse resp = await pwi2.CikkListBySiteFullAsync(kapcsolodoCikk.Cikk_ID);

					if (resp.Body.CikkListBySiteFullResult.ErrorCode == Pwi2.WMWIErrorCode.NoError)
					{
						currentcikk = resp.Body.CikkListBySiteFullResult.List[0];
					}

					string currentszovegdoboz = szovegdoboz;
					currentszovegdoboz = currentszovegdoboz.Replace("*CIKKURL*", "/cikk/" + currentcikk.SeoUrl + "/?" + kapcsolodoCikk.UTM);
					currentszovegdoboz = currentszovegdoboz.Replace("*KEPURL*", currentcikk.BevezetoKepUrl);
					currentszovegdoboz = currentszovegdoboz.Replace("*KEPALTAG*", currentcikk.Alttag);
					currentszovegdoboz = currentszovegdoboz.Replace("*CIM*", currentcikk.Cim);
					currentszovegdoboz = currentszovegdoboz.Replace("*BEVEZETO*", currentcikk.Bevezeto);
					if (!string.IsNullOrEmpty(currentcikk.SeoUrl))
					{
						tartalom = tartalom.Replace(kapcsolodoCikk.Original, currentszovegdoboz);
					}
					else
					{
						tartalom = tartalom.Replace(kapcsolodoCikk.Original, "");
					}

				}
			}

			return tartalom;
        }

    }

}
