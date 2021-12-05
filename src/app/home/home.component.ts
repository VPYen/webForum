import { HttpService } from "../http.service"
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formLogin = {username:"", password:""}
  login = true
  register = false
  errors: any = {}
  success: any = {}
  formReg = {username:"", password:"", passConfirm:""}

  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute, private _router: Router) { }

  // To Do:
  // Establish redirection to forum page after login

  ngOnInit(): void {
    this.formLogin = {username: "", password: ""};
    this.formReg = {username:"", password:"", passConfirm:""};
  }

  loginToggle(){
    this.register = false
    this.login = true
    this.errors = {}
  }

  regToggle(){
    this.register = true
    this.login = false
    this.errors = {}
  }

  submitLogin() {
    this.success = {}
    console.log("submitLogin")
    this.errors = {};
    let observable = this._httpService.getUserFromService(this.formLogin);
    observable.subscribe((data : { [key:string]: any}) => {
      if(data['error']) {
        console.log(data);
        this.errors = data;
      }else {
        console.log(data)
        this.success = {success: "Login Successful"};
        this.formLogin = {username: "", password: ""};
        localStorage.setItem('user', data['user']['userName']);
        localStorage.setItem('token', data['user']['password']);
        this._router.navigate(['/forums']);
      }
    })
  }

  submitReg() {
    this.success = {}
    console.log("submitReg")
    this.errors = {};
    if(this.formReg.username.toUpperCase() === "GUEST") {
      this.errors = {errorUser: "Cannot use 'Guest' as a username"};
    }else if(this.formReg.password != this.formReg.passConfirm) {
      this.errors = {errorConfirm: "Password does not match confirmation"}
    }else {
      let observable = this._httpService.postNewUserFromService(this.formReg);
      observable.subscribe((data : { [key:string]: any}) => {
        console.log(data);
        if(data['error']) {
          this.errors = data;
        } else {
          this.success = {success: "Account Creation Successful"}
          this.formReg = {username: "", password: "", passConfirm: ""};
        }
      })
    }
  }

}
