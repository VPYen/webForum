import { HttpService } from "../http.service"
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit {

  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
  }

}
