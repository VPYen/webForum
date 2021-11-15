import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  
  // To Do:
  // Establish Profile icon for login and redirection to forum page if user is logged in.
  // Establish logout function
  
  ngOnInit(): void {
  }

}
