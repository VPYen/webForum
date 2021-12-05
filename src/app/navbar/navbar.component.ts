import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() user: boolean = false;
  username: any = null;
  constructor(private _router: Router) { }
  
  // To Do:
  // Establish Profile icon for login and redirection to forum page if user is logged in.
  // Establish logout function
  
  ngOnInit(): void {
    this.username = localStorage.getItem("user");
  }

  userLogout(){
    this.username = null;
    localStorage.clear();
    this._router.navigate(['/'])
  }

}
