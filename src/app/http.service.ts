import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
    baseURL: string = "/api/";
    constructor (private _http: HttpClient) {}

    // Users
    getAllUsersFromService(){
      return this._http.get(this.baseURL + "user/all");
    }

    checkTokenFromService(form: any){
      return this._http.post(this.baseURL + "user/check", form)
    }

    postNewUserFromService(form: any){
      return this._http.post(this.baseURL + "user/new", form);
    }

    getUserFromService(form:any){
      return this._http.post(this.baseURL + "user/login", form);
    }

    // Threads
    getAllThreadsFromService(){
      return this._http.get(this.baseURL + "threads/all");
    }

    getSingleThreadFromService(id:String) {
      return this._http.get(this.baseURL + "thread/" + `${id}`);
    }

    postNewThreadFromService(form:any){
      return this._http.post(this.baseURL + "threads/new", form);
    }

    // Posts
    postNewPostFromService(form:any){
      return this._http.post(this.baseURL + "threads/posts/new", form);
    }
}