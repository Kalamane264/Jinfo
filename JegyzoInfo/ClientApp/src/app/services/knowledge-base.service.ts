import { Folyamat } from './../interfaces/folyamat';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeBaseService {

  constructor(private http: HttpClient) { }

  getFolyamats(): Observable<Folyamat[]>{
    return this.http.get<Folyamat[]>("/api/KnowledgeBase/GetFolyamats");
  }

  folyamatAgListazasaFoFolyamatIDSzerint(id: number): Observable<Folyamat> {
    return this.http.get<Folyamat>("/api/KnowledgeBase/FolyamatAgListazasaFoFolyamatIDSzerint/" + id);
  }

  folyamatAgListazasaFoFolyamatSEOURLSzerint(seoUrl: string): Observable<Folyamat> {
    return this.http.get<Folyamat>("/api/KnowledgeBase/FolyamatAgListazasaFoFolyamatSEOURLSzerint/" + seoUrl);
  }

  folyamatFindById(folyamats: Folyamat[], id: number): Folyamat | undefined{

    let found = folyamats.find(f => f.folyamatID == id);
    if(found !== undefined){
      return found;
    }
    else{
      for(let i = 0 ; i < folyamats.length; i++)
      {
        if(folyamats[i].folyamatok.length > 0)
        {
          return this.folyamatFindById(folyamats[i].folyamatok, id);
        }
      }
    }
    return undefined;
  }
}
