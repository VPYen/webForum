import { HttpService } from "../http.service"
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-permissions-page',
  templateUrl: './permissions-page.component.html',
  styleUrls: ['./permissions-page.component.css']
})
export class PermissionsPageComponent implements OnInit {

  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
  }


}
