import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit{
  constructor(private prod:ProductsService) {}

  orderDetails:any;
  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(){
    let user = localStorage.getItem("User");
    let userData = user && JSON.parse(user);
    let userId = userData.id;
      this.prod.getAllOrdersByUserId(userId).subscribe((res)=>{
        console.log(res);
        this.orderDetails = res;
      })
  }

  deleteOrder(orderId:number){
    this.prod.deleteOrder(orderId).subscribe((res)=>{
      console.log(res);
      this.getOrderDetails();
    })
  }
  
}
