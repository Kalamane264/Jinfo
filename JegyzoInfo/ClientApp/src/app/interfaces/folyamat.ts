export interface Folyamat{
  folyamatID: number;
  folyamatKategoriaID: number;
  hatalyos:	boolean;
  lead:	string;
  marketingLead: string;
  nev: string;
  parentID?: number;
  seoDesc: string;
  seoFoKeresesiKifejezes:	string;
  seoTitle:	string;
  seoURL:	string;
  sorszam: number;
  szoveg:	string;
  szovegesNev: string;
	folyamatok: Folyamat[];
  torolve:	boolean;
};
