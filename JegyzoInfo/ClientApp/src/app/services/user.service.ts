import { Diak } from './../interfaces/diak';
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
      this.user = new User(usi.felhasznaloID, usi.email, usi.nev);

      if(this.user instanceof User) {
        this.userLoggedIn = true;
      }
    }
  }

  passwordReminder(email: string): Observable<boolean> {
    return this.http.get<boolean>('/api/User/passwordReminder/' + email );
  }

  getDiakByUserID(userId: number): Observable<any> {
    return this.http.get<any>('/api/User/GetDiakByUserID/' + userId );
  }

  felhasznalohozKapcsolodoDiakok(userId: number): Observable<Diak[]> {
    return this.http.get<Diak[]>('/api/User/FelhasznalohozKapcsolodoDiakok/' + userId );
  }

  kepzesJelentkezes(form: any): Observable<User>{
    return this.http.post<User>('/api/User/KepzesJelentkezes', form);
  }
}
