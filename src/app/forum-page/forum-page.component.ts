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
    this.forum = {}
    this.getThreads();
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
