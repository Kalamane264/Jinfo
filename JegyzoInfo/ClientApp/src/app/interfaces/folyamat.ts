export class Folyamat{
  folyamatID: number = 0;
  folyamatKategoriaID: number = 0;
  hatalyos:	boolean = true;
  lead:	string = "";
  marketingLead: string = "";
  nev: string = "";
  parentID?: number;
  seoDesc: string = "";
  seoFoKeresesiKifejezes:	string = "";
  seoTitle:	string = "";
  seoURL:	string = "";
  sorszam: number = 0;
  szoveg:	string = "";
  szovegesNev: string = "";
	folyamatok: Folyamat[] = [];
  torolve: boolean = false;
  megjelenesDatum: Date = new Date();
};
