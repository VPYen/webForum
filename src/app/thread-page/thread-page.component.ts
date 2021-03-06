import { HttpService } from "../http.service"
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.css']
})
export class ThreadPageComponent implements OnInit {

  id : string = ""
  thread : any = {}

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute, private _router: Router) { }

  // To do:
  // Retrive thread content by id
  // Establish ability to create new posts and attach to thread

  ngOnInit(): void {
    this.checkToken();
    this._route.params.subscribe((params: Params) => {
      this.id = params["id"];
    });
    this.thread = {}
    this.getThread();
  }

  checkToken(){
    let token: any = null;
    let user: any = null;
    token = localStorage.getItem('token');
    user = localStorage.getItem('user');
    if (token){
      let observable = this._httpService.checkTokenFromService({username: user, password: token})    
      observable.subscribe((data : {[key:string] : any}) => {
          console.log(data)
          if(data["error"]){
            this._router.navigate(['/permissions'])
          }
      });
    }else{
      this._router.navigate(['/permissions'])
    }
  }


  getThread(){
    let observable = this._httpService.getSingleThreadFromService(this.id);
    observable.subscribe((data : {[key:string]: any})  => {
      console.log(data)
      if(data["error"]){
        console.log(data["error"])
      }
      else{
        this.thread = data["thread"];
      }
    })
  }

}
