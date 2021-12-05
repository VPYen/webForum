import { HttpService } from "./http.service"
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private _route: ActivatedRoute, private _router: Router, private _httpService: HttpService) {}

  ngOnInit() {}


  scrollToTop() {
    document.body.scrollTop = 0;              // For Safari
    document.documentElement.scrollTop = 0;   // For Chrome, Firefox, IE and Opera
  }
}
