import { SpinnerService } from './spinner.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor (
    private http: HttpClient,
    private spinnerService: SpinnerService
    ) { }

  saveContactForm(data: any){
    this.spinnerService.showSpinner();
    let $o = this.http.post("api/Contact/SaveMoreInfo", data);
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }
}
