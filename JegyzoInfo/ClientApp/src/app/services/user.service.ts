import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoggedIn = false;
  user: User;

  constructor(private http: HttpClient, private cookieService: CookieService) {

      this.restoreUserFromCookie();
      console.log('usirestored', this.user);
  }

  login(email: string, password: string){
    this.http.post<User>('/api/User/Login', { email: email, password: password }).subscribe(user => {
      this.storeUserInCookie(user);
      this.user = user;
    })
  }

  storeUserInCookie(user: User) {
    let userStringified = JSON.stringify(user);
    this.cookieService.set('user', userStringified);
  }

  restoreUserFromCookie(){
    let userStringified = this.cookieService.get('user');
    // debugger;
    if(userStringified !== null && userStringified !== undefined && userStringified !== '')
    {
      this.user = JSON.parse(userStringified);
    }
  }
}
