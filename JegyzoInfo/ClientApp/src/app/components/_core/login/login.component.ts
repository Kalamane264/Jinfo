import { UserService } from './../../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() loginIsOpened = false;

  loginForm = {
    email: "",
    password: ""
  };

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
  }

  login(){
    console.log("Loginy!");

    this.userService.login(this.loginForm.email, this.loginForm.password).subscribe(resp => {

      console.log("LoginResp", resp);
    });
  }
}
