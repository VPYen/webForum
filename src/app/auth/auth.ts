import { HttpService } from "../http.service"
import { Router } from '@angular/router';

 export class Auth {
    constructor(private _httpService: HttpService,
                private _router: Router) {}

    checkToken(){
        let token: any = null;
        let user: any = null;
        token = localStorage.getItem('token');
        user = localStorage.getItem('user');
        
        if (token){
            let observable = this._httpService.getUserFromService({username: user, password: token})    
            observable.subscribe((data : {[key:string] : any}) => {
                if(data["error"]){
                this._router.navigate(['/restricted'])
                }
            });
            }else{
                this._router.navigate(['/restricted'])
            }
    }
}