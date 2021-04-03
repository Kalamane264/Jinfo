import { SpinnerService } from './spinner.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Expert } from '../interfaces/expert';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
    ) { }

  getSzakertoAdatokFullBySzakertoId(id: number): Observable<Expert>{
    this.spinnerService.showSpinner();
    let $o = this.http.get<Expert>("api/Expert/GetSzakertoAdatokFullBySzakertoId/" + id);
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }
}
