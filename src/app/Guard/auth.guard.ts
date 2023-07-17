import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ECommService } from '../services/seller.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Tutorial logic
  constructor(private sellerService:ECommService){}
   canActivate() {
       if(localStorage.getItem("Seller")){
         return true;
       }
     return this.sellerService.isSellerLoggedIn;
   } 

   
  //  My Logic
 /* canActivate(){
    if(localStorage.getItem("Seller")){
      return true;
    }
      return false;
  } */
  
}
