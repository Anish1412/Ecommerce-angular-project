import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Cart, Product } from '../data-type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{

  constructor(private user:UserService, private route:Router) {}
  signup:boolean=true;
  login:boolean=false;

  // **** Signup ****
  @ViewChild('UserSignup') signUp !: NgForm;
  Signup(){
    // console.log(this.signUp.value);
    this.user.addUser(this.signUp.value).subscribe((res:any)=>{
      console.log(res);
      if(res){
        localStorage.setItem("User",JSON.stringify(res));
        this.route.navigate(['']);
        // Refreshing the page to get to know the actual No.of products added in the cart by the User
        location.replace('');

        let user = localStorage.getItem("User");
        let userData = user && JSON.parse(user);
        let userId = userData.id;

        let localCart = localStorage.getItem("localCart");
        let products = localCart && JSON.parse(localCart);
        if(products && products.length){
          products.forEach((value:Cart,index:any)=>{
            // console.log(value);
            let cartItems:Cart = {
              ...value,
              userId,
              productId:value.id
            }
            delete cartItems.id;
            // console.log(cartItems);
            this.user.addProduct(cartItems).subscribe((res)=>{
              console.log(res);
            })
            if(products.length === index+1){
              localStorage.removeItem("localCart");
              location.replace('');
            }
          });
        }
      }
    })
  }

  userLogin(){
    this.signup = false;
    this.login = true;
  }

  // **** Login ****
  @ViewChild('UserLogin') loginUser !: NgForm;
  noUserFoundMessage:string = "";
  Login(){
    this.user.getUser(this.loginUser.value).subscribe((res:any)=>{
      // console.log(res); 
      if(res && res.length){
        localStorage.setItem("User",JSON.stringify(res[0]));
          this.route.navigate(['']);
          // Refreshing the page to get to know the actual No.of products added in the cart by the User
          location.replace('');

        let user = localStorage.getItem("User");
        let userData = user && JSON.parse(user);
        let userId = userData.id;

        let localCart = localStorage.getItem("localCart");
        let products = localCart && JSON.parse(localCart);
        if(products && products.length){
          products.forEach((value:Cart,index:any)=>{
            // console.log(value);
            let cartItems:Cart = {
              ...value,
              userId,
              productId:value.id
            }
            delete cartItems.id;
            // console.log(cartItems);
            this.user.addProduct(cartItems).subscribe((res)=>{
              console.log(res);
            })
            if(products.length === index+1){
              localStorage.removeItem("localCart");
              location.replace('');
            }
          });
        }
      }
      else {
        this.noUserFoundMessage = "No Such User Found!!";
        setTimeout(()=>{
          this.noUserFoundMessage = "";
        },3000)
      }
    })
  }

  // ********* Username Validation **********
  invalidPassword:boolean|undefined = false;
  btnDisabled:boolean = true;
  getUserByPassword(data:KeyboardEvent){
    let val = data.target as HTMLInputElement;
    this.user.getUserByUserName(val.value).subscribe((res:any)=>{
      // console.log(res);
      if(res.length != 0){
        this.invalidPassword = true;
        this.btnDisabled = true;
      }
      else {
        this.invalidPassword = false;
        this.btnDisabled = false;
      }
    })
  }

  userSignup(){
    this.signup = true;
    this.login = false;
  }

  ngOnInit(): void {

  }

}
