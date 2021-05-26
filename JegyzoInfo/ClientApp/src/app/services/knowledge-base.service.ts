import { Folyamat } from './../interfaces/folyamat';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeBaseService {

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
    ) { }

  getFolyamats(): Observable<Folyamat[]>{
    //this.spinnerService.showSpinner();
    //console.log("Tudástár: Sószpinner");
    let $o = this.http.get<Folyamat[]>("/api/KnowledgeBase/GetFolyamats");
    $o.subscribe(resp => {
      //this.spinnerService.hideSpinner();
      //console.log("Tudástár: hájdspinner");
    });
    return $o;
  }

  folyamatAgListazasaFoFolyamatIDSzerint(id: number): Observable<Folyamat> {
    this.spinnerService.showSpinner();
    let $o = this.http.get<Folyamat>("/api/KnowledgeBase/FolyamatAgListazasaFoFolyamatIDSzerint/" + id);
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }

  folyamatAgListazasaFoFolyamatSEOURLSzerint(seoUrl: string): Observable<Folyamat> {
    this.spinnerService.showSpinner();
    let $o = this.http.get<Folyamat>("/api/KnowledgeBase/FolyamatAgListazasaFoFolyamatSEOURLSzerint/" + seoUrl);
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
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
