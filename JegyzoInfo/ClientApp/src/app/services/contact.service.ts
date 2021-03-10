import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  saveContactForm(data: any){
    return this.http.post("api/Contact/SaveMoreInfo", data);
  }
}
