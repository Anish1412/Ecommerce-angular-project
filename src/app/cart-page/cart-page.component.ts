import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';
import { Cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit{
  constructor(private user:UserService, private route:Router) {}

  priceSummary:priceSummary = {
    amount:0,
    tax:0,
    delivery:100,
    discount:0,
    total:0
  }
  cartData:Cart[]|undefined;
  ngOnInit(): void {
    if(localStorage.getItem("User")){
      let user = localStorage.getItem("User");
      let userData = user && JSON.parse(user);
      let userId = userData.id;
      this.user.getProductsByUserId(userId).subscribe((res:any)=>{
        this.cartData = res;
        // Remember, we cannot access the values of observable outside Subscription bracket
        let totalPrice:number = 0;
        console.log(res);
        for(let i=0;i<res.length;i++){
          // console.log(parseInt(res[i].Price)*parseInt(res[i].quantity));
          totalPrice += parseInt(res[i].Price)*parseInt(res[i].quantity);
        }
        this.priceSummary.amount = totalPrice;
        this.priceSummary.tax = totalPrice/10;
        this.priceSummary.discount = totalPrice/10;
        this.priceSummary.total = Math.ceil(totalPrice+(totalPrice/10)+100 - totalPrice/10);

        if(res.length === 0){
          location.replace('');
        }
      })
    }
  }

  removeItem(id:number|undefined){
    this.user.deleteProductByAPIid(id).subscribe((res:any)=>{
      console.log(res);
    })
    location.replace(`/cart-page`);
}

checkout(){
  this.route.navigate(['checkout'])
}

}
