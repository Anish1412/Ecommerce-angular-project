import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private route:Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    if(localStorage.getItem("User")){
      this.route.navigate(['']);
      return false;
    }
    return true;
  }
  
}
