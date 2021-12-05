import { HttpService } from "../http.service"
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';


@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})
export class ForumPageComponent implements OnInit {
  id = null;
  forum : any = [];


  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute, 
              private _router: Router) {}

  // To Do:
  // Establish direction to given thread upon click of name from table
  // Populate table with all threads from db
  // Est. ability to create new threads

  ngOnInit(): void {
    this.checkToken();
    this.forum = {};
    this.getThreads();
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

  getThreads(){
    let observable = this._httpService.getAllThreadsFromService();
    observable.subscribe((data : {[key:string] : any}) => {
      if(data["error"]){
        console.log(data["error"]);
      }else{
        console.log(data["threads"])
        this.forum = data["threads"];
        console.log("forum",this.forum)
      }
    });
  }

}
