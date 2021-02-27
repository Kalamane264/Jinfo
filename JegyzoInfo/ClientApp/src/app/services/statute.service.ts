import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatuteService {

  constructor(private http: HttpClient) { }

  GetJogszabalySzovegJelenlegiDatumSzerint(uid: string){
    return this.http.get<any>("/api/Article/getArticle/" + uid);
  }
}
