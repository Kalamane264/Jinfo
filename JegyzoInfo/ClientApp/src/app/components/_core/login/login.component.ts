import { UserService } from './../../../services/user.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() loginIsOpened = false;
  @Output() loginSuccess: EventEmitter<string> = new EventEmitter();

  loginForm = {
    email: "hivessy@menedzserpraxis.hu",
    password: "123456"
  };

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
  }

  login(){
    this.userService.login(this.loginForm.email, this.loginForm.password).subscribe(user => {
      if(user) {
        this.loginSuccess.emit("fasz");
      } else {
        alert("Hibás felhasználónév / jelszó!");
      }
    });
  }
}
