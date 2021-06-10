using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JegyzoInfo.ViewModels
{
    public class JelentkezesVM
    {
        public int kepzesId { get; set; }
        public int felhasznaloID { get; set; }
        public int iD_DIAK { get; set; }
        public string elonev { get; set; }
        public string vezeteknev { get; set; }
        public string keresztnev { get; set; }
        public string szuletesinev { get; set; }
        public string anyjaneve { get; set; }
        public string allampolgarsag { get; set; }
        public string szulhely { get; set; }
        public string adoszam { get; set; }
        public string email { get; set; }
        public string telefoN1 { get; set; }
        public string vegzettseg { get; set; }
        public int szulEv { get; set; }
        public int szulHonap { get; set; }
        public int szulNap { get; set; }

        public int reducedForm { get; set; }
    }
}
