
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from "@angular/router";
import { ServicesService } from "./Service.services";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGaurd implements CanActivate{
     constructor(private authService: ServicesService, public router:Router ){}
   canActivate(route :ActivatedRouteSnapshot,state: RouterStateSnapshot){
     let tocken = localStorage.getItem('isLogin');
     if(tocken){
       return true;
     }
     this.router.navigate(['/login']);
      return false;
   }
}
