import { Diak } from './../interfaces/diak';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoggedIn = false;
  user = new User();
  loginHappened = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private spinnerService: SpinnerService) {

      this.restoreUserFromCookie();
      console.log('usirestored', this.user);
  }

  login(email: string, password: string): Observable<User>{
    this.spinnerService.showSpinner()
    let $login = this.http.post<User>('/api/User/Login', { email: email, password: password });
    $login.subscribe(user => {
      this.spinnerService.hideSpinner();
      if(user) {
        console.log("user loginresp", user);
        this.storeUserInCookie(user);
        this.user = user;
        this.userLoggedIn = true;
        this.loginHappened.next(true);
      }
    });
    return $login;
  }

  logout() {
    this.userLoggedIn = false;
    this.user = new User();
    this.cookieService.delete('user');
    this.loginHappened.next(false);
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
        this.loginHappened.next(true);
      }
    }
  }

  passwordReminder(email: string): Observable<boolean> {
    let $o = this.http.get<boolean>('/api/User/passwordReminder/' + email ); this.spinnerService.showSpinner();
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }

  getDiakByUserID(userId: number): Observable<any> {
    this.spinnerService.showSpinner();
    let $o = this.http.get<any>('/api/User/GetDiakByUserID/' + userId );
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }

  felhasznalohozKapcsolodoDiakok(userId: number): Observable<Diak[]> {
    this.spinnerService.showSpinner();
    let $o = this.http.get<Diak[]>('/api/User/FelhasznalohozKapcsolodoDiakok/' + userId );
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }

  kepzesJelentkezes(form: any): Observable<User>{
    this.spinnerService.showSpinner();
    let $o = this.http.post<User>('/api/User/KepzesJelentkezes', form);
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    },
    error => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }

  kerdes(form: any): Observable<boolean>{
    this.spinnerService.showSpinner();
    let $o = this.http.post<boolean>('/api/User/Kerdes', form);
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }
}
