import { Folyamat } from './folyamat';
import { Jogszabaly } from './jogszabaly';

export class Article{
  alttag?:	string;
  bevezeto?: string;
  bevezetoKepUrl?:	string;
  cikkID = 0;
  cim?: string;
  cimlap?: boolean;
	ervenyessegDatum?: Date;
  keredzhetoSzakertoID?: number;
  kiegeszites?: string;
  latogatovezerloCikkID?: number;
  latogatovezerloUTM = "";
  lead2?: string;
	letrehozasDatum?: Date;
  megjelenesDatum = new Date();
  premium?: boolean;
  seoDesc?: string;
  seoKeys?: string;
  seoTitle?: string;
  seoUrl = "";
  statuszID?: number;
  szakertoID = 0;
  tartalom?: string;
  olvasasiIdo?: string;
  jogszabalys: Jogszabaly[] = [];
  folyamats: any[] = [];
}
