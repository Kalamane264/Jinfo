import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatuteService {

  constructor(private http: HttpClient) { }

  getJogszabalySzovegJelenlegiDatumSzerint(uid: string){
    return this.http.get<any>("api/Statute/GetJogszabalySzovegJelenlegiDatumSzerint/" + uid);
  }

  getJogszabalySzovegHTMLJelenlegiDatumSzerint(uid: string){
    return this.http.get<any>("api/Statute/GetJogszabalySzovegHTMLJelenlegiDatumSzerint/" + uid);
  }
}
