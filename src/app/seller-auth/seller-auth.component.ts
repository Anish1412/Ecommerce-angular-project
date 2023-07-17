import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ECommService } from '../services/seller.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  // Tutorial Logic
  constructor(private ecomm: ECommService, private route: Router) {}
  isDisplaySignUp: boolean = true;
  isDisplayLogin: boolean = false;
  Error!: boolean;

  // Sign-Up
  sellSignUp(data: NgForm) {
    console.log(data.value);
    this.ecomm.userSignUp(data.value);
  }

  // ******* Password Validation ********
  // invalidPassword:boolean|undefined = false;
  // btnDisabled:boolean|undefined = true;
  // getUserByPassword(data:KeyboardEvent){
  //   let val = data.target as HTMLInputElement;
  //   this.ecomm.getSellerByPassword(val.value).subscribe((res:any)=>{
  //     // console.log(res);
  //     if(res.length != 0){
  //       this.invalidPassword = true;
  //       this.btnDisabled = true;
  //     }
  //     else {
  //       this.invalidPassword = false;
  //       this.btnDisabled = false;
  //     }
  //   })
  // }

  sellReset(data: NgForm) {
    data.reset();
  }
  onSignUp() {
    this.isDisplaySignUp = true;
    this.isDisplayLogin = false;
  }

  // Login
  sellLogin(data: NgForm) {
    this.ecomm.userLogin(data.value);
    this.ecomm.isError.subscribe((res) => {
      this.Error = res;
    });
  }
  onLogin() {
    this.isDisplaySignUp = false;
    this.isDisplayLogin = true;
  }

  ngOnInit(): void {
    this.ecomm.getReload();
    // You need not to create a function like this in Service & check localStorage & then Route to another component
    //  by calling inside another component instead you can write like this logic inside that component only.
    //  if(localStorage.getItem("Seller")){
    //    this.route.navigate(['Seller-home']);
    //   }
  }

  // My Logic

  /* isDisplaySignUp:boolean = true;
  isDisplayLogin:boolean = false;
  // SignUp
  sellSignUp(data:NgForm){
    this.ecomm.userSignUp(data.value).subscribe((res)=>{
      console.log(res);
      localStorage.setItem("Seller",JSON.stringify(res));
      this.route.navigate(['Seller-home']);
    });
  }
  sellReset(data:NgForm){
    data.reset();
  }
  onSignUp(){
    this.isDisplaySignUp = true;
    this.isDisplayLogin = false;
  }

  // Login
  sellLogin(data:NgForm){
    this.ecomm.isLogin(data.value).subscribe((res)=>{
      console.log(res);
      localStorage.setItem("Seller",JSON.stringify(res));
      this.route.navigate(['Seller-home']);
    });
  }
  onLogin(){
    this.isDisplaySignUp = false;
    this.isDisplayLogin = true;
  }

  ngOnInit(): void {
    // You need not to create function in Service & call below like this
      // this.ecomm.getReload();

    // instead, you can directly Route from here, By checking localStorage
      if(localStorage.getItem("Seller")){
      this.route.navigate(['Seller-home']);
      }
  } */
}
