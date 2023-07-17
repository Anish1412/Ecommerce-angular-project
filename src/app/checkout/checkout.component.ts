import { Component, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private user:UserService, private prod:ProductsService, private route:Router) {}

  @ViewChild("Order") data !: NgForm;

  totalAmount:number = 0;
  userEmail:string|undefined;
  ngOnInit(): void {
    if(localStorage.getItem("User")){
      let user = localStorage.getItem("User");
      let userData = user && JSON.parse(user);
      let userId = userData.id;
      this.user.getProductsByUserId(userId).subscribe((res:any)=>{
    // Remember, we cannot access the values of observable outside Subscription bracket
    // For that, we have to declare an variable in Observable & pass value to it & then that value pass 
    // outside the bracket variable, but perform all these tasks inside Observable bracket
        let totalPrice:number = 0;
        console.log(res);
        for(let i=0;i<res.length;i++){
          totalPrice += parseInt(res[i].Price)*parseInt(res[i].quantity);
        }
        this.totalAmount = Math.ceil(totalPrice+(totalPrice/10)+100 - totalPrice/10);
      })

      // Keeping by default User Email address
      this.user.getUserById(userId).subscribe((res:any)=>{
        // console.log(res);
        this.userEmail = res[0].Email;
      })
    }
  }

  orderMsg:string|undefined;
  OrderNow(){
    // console.log(this.data.value);
    if(localStorage.getItem("User")){
      let user = localStorage.getItem("User");
      let userData = user && JSON.parse(user);
      let userId = userData.id;
      let shippingDetails = {
        ...this.data.value,
        price:this.totalAmount,
        userId
      }

      this.user.getProductsByUserId(userId).subscribe((res:any)=>{
        // console.log(res);
        if(res && res.length){
          for(let i=0;i<res.length;i++){
    // 1) Sometimes what happen, when all APIs are hit at the same time, JSON server can't handle it 
    //    at the same time, So, that's why we need to use setTimeout function, to give it some time to
    //    load the whole data.
            setTimeout(()=>{
              res[i].id && this.user.deleteProductByAPIid(res[i].id).subscribe((res)=>{
                console.log(res);
              })
            },700);
          }
        }
      })
          
      this.prod.orderNow(shippingDetails).subscribe((res:any)=>{
        console.log(res);
        if(res){
          this.orderMsg = "Your Order has been placed successfully!!";
          setTimeout(()=>{
            this.orderMsg = "";
            this.route.navigate(['my-orders']);
            location.replace('/my-orders');
          },3000)
        }
      })


      


    }

  }

}

