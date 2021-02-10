import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    console.log('Logájn', email, password);
    return this.http.post('/api/User/Login', { email: email, password: password });
  }
}
