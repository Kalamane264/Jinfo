import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoggedIn = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    return this.http.post('/api/User/Login', { email: email, password: password });
  }
}
