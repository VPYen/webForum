import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

import { HttpService } from "./http.service"
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ForumPageComponent } from './forum-page/forum-page.component';
import { PermissionsPageComponent } from './permissions-page/permissions-page.component';
import { RestrictedAccessPageComponent } from './restricted-access-page/restricted-access-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ThreadPageComponent } from './thread-page/thread-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ForumPageComponent,
    PermissionsPageComponent,
    RestrictedAccessPageComponent,
    NotFoundPageComponent,
    ThreadPageComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
