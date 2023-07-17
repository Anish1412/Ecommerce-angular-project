import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddProduct, Login, SignUp } from 'src/app/data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ECommService {

  baseUrl:string = 'http://localhost:3000/';

  // Tutorial Logic
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isError = new EventEmitter<boolean>(false);
  constructor(private ecomm:HttpClient,private route:Router) { }

  getSellerByPassword(body:any){
    return this.ecomm.get(`${this.baseUrl}Seller?Password=${body}`);
  }

  userSignUp(data:SignUp){
    return this.ecomm.post(`${this.baseUrl}Seller`,data, { observe : 'response'}).subscribe((res)=>{
      // BehavorSubject
      this.isSellerLoggedIn.next(true);
      // LocalStorage
      localStorage.setItem("Seller",JSON.stringify(res.body));
      // Navigation
      this.route.navigate(['Seller-home']);
      // Output
      console.log(res.body);
    })
  }

  userLogin(data:Login){
    return this.ecomm.get(`${this.baseUrl}Seller?Email=${data.Email}&Password=${data.Password}`,{ observe : 'response'}).subscribe((res:any)=>{
      console.log(res.body);
      if(res && res.body && res.body.length){
        localStorage.setItem("Seller",JSON.stringify(res.body));
        Swal.fire(
          'Good job!',
          'You have Loggedin successfully!!',
          'success'
        )
        setTimeout(()=>{
          this.route.navigate(['Seller-home']);
        },3000)
        this.isError.emit(false);
      }
      else {
        this.isError.emit(true);
      }     
    });
  }

  getReload(){
    if(localStorage.getItem("Seller")){
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['Seller-home']);
    }
  }


  // My Logic
  /* constructor(private ecomm:HttpClient,private route:Router) { }

  userSignUp(data:SignUp){
    return this.ecomm.post(`http://localhost:3000/Seller`,data);
  }

  isLogin(data:Login){
    return this.ecomm.get(`http://localhost:3000/Seller?Email=${data.Email}&Password=${data.Password}`);
  } 


// You need not to create a function like this & check localStorage & then Route to another component
//  by calling inside another component instead you can write like this logic inside that component only.
   // getReload(){
   //  if(localStorage.getItem("Seller")){
   //    this.route.navigate(['Seller-home']);
   //   }
   // } 

*/
  

}

