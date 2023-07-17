import { Component, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Cart, Product } from '../data-type';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  constructor(private jitu:ActivatedRoute, private prod:ProductsService, private user:UserService) {}

  productData: Product | undefined;
  id!:number;
  removeItem:boolean = false;
  // ID of the Product present in the API List
  productApiId!:number;
  ngOnInit(): void {
      this.jitu.params.subscribe((res:any)=>{
        console.log(res.productId);
        this.id = res.productId;
      })
      this.prod.getProductsById(this.id).subscribe((res)=>{
        // console.log(res);
        this.productData = res;
      })

      // To set button as "Add to Cart" or "Remove item" if it is Guest User
      let cartData = localStorage.getItem("localCart");
      if(this.id && cartData){
        let cartItems = JSON.parse(cartData);
        //1) If we check in filter function using "==" operator then it will display values
        //2) But, if we use "===" operator then it will check first datatypes & in this condition
        //   (this.id) => String & (res.id) => Number. So, because of mismatch it will not get execute & will
        //    return null.
        cartItems = cartItems.filter((res:Product)=>this.id == res.id);
        if(cartItems.length){
          this.removeItem = true;
        }
        else {
          this.removeItem = false;
        }
      }

      // To set button as "Add to Cart" or "Remove item" if it is LoggedIn User
      if(localStorage.getItem("User")){
        let user = localStorage.getItem("User");
        let userData = user && JSON.parse(user);
        let userId = userData.id;
        this.user.getProductsByUserId(userId).subscribe((res:any)=>{
          // console.log(res);
          if(res && res.length){
            for(let i=0;i<res.length;i++){  
            if(this.id == res[i].productId){
              this.removeItem = true;
              this.productApiId = res[i].id;
              break;
            }
            else {
              this.removeItem = false;
            }
            }
          }
        })
      }
  }


  quantity:number = 1;
  Add(){
    if(this.quantity < 20){
      this.quantity++;
    }
  }

  deduct(){
    if(this.quantity > 1){
      this.quantity--;
    }
  }

  addCart(){
    if(this.productData){
      this.productData.quantity = this.quantity;
      if(!localStorage.getItem("User")){
        // console.log(this.productData);
        this.prod.localCart(this.productData);
        this.removeItem = true;
        // Refreshing the page, to get know the No.of products stored in the localStorage
        location.replace(`/details/${this.id}`);
      }
      else {
        let user = localStorage.getItem("User");
        let userData = user && JSON.parse(user);
        let userId = userData.id;
        // console.log(userId);
        let cartData:Cart = {
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete cartData.id;
        // console.log(cartData);
        this.user.addProduct(cartData).subscribe((res)=>{
          console.log(res);
        })
        location.replace(`/details/${this.id}`);
      }
    }
  }

  removeCart(id:number|undefined){
    if(!localStorage.getItem("User")){
    this.prod.removeCart(id);
    this.removeItem = false;
    // Refreshing the page, to get to know the No.of products stored in the localStorage
    location.replace(`/details/${this.id}`);
  }
  else {
    this.user.deleteProductByAPIid(this.productApiId).subscribe((res:any)=>{
      console.log(res);
    })
    location.replace(`/details/${this.id}`);
  }
  }


}
