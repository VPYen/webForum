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
  threads = null;


  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute, 
              private _router: Router) {}

  ngOnInit(): void {
    this.getThreads();
  }

  getThreads(){
    let observable = this._httpService.getAllThreadsFromService();
    observable.subscribe(data => {
      console.log(data);
      // if(data["error"]){
      //   console.log(data["error"]);
      // }else{
      //   this.threads = data["threads"];
      // }
    });
  }


}
