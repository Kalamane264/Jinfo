import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoggedIn = false;
  user = new User();

  constructor(private http: HttpClient, private cookieService: CookieService) {

      this.restoreUserFromCookie();
      console.log('usirestored', this.user);
  }

  login(email: string, password: string): Observable<User>{
    let $login = this.http.post<User>('/api/User/Login', { email: email, password: password });
    $login.subscribe(user => {
      if(user) {
        console.log("user loginresp", user);
        this.storeUserInCookie(user);
        this.user = user;
        this.userLoggedIn = true;
      }
    });
    return $login;
  }

  logout() {
    this.userLoggedIn = false;
    this.user = new User();
    this.cookieService.delete('user');
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
      let usi = JSON.parse(userStringified) as User;
      this.user = new User(usi.FelhasznaloID, usi.Email, usi.Nev);

      if(this.user instanceof User) {
        this.userLoggedIn = true;
      }
    }
  }
}
