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
  formReg = {username:"", password:"", passConfirm:""}

  @Output() user = new EventEmitter();

  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.formLogin = {username: "", password: ""};
    this.formReg = {username:"", password:"", passConfirm:""};
  }

  loginToggle(){
    this.register = false
    this.login = true
  }

  regToggle(){
    this.register = true
    this.login = false
  }

  submitLogin() {
    this.errors = {};
    let observable = this._httpService.getUserFromService(this.formLogin);
    observable.subscribe((data : { [key:string]: any}) => {
      if(data['error']) {
        console.log(data);
        this.errors = data;
      }else {
        this.user.emit(data['user']);
        this.formLogin = {username: "", password: ""};
      }
    })
  }

  submitReg() {
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
          this.user.emit(data['user']);
          this.formReg = {username: "", password: "", passConfirm: ""};
        }
      })
    }
  }


}