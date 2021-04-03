import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class StatuteService {

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
    ) { }

  getJogszabalySzovegJelenlegiDatumSzerint(uid: string){
    this.spinnerService.showSpinner();
    let $o = this.http.get<any>("api/Statute/GetJogszabalySzovegJelenlegiDatumSzerint/" + uid);
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }

  getJogszabalySzovegHTMLJelenlegiDatumSzerint(uid: string){
    this.spinnerService.showSpinner();
    let $o = this.http.get<any>("api/Statute/GetJogszabalySzovegHTMLJelenlegiDatumSzerint/" + uid);
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }
}
