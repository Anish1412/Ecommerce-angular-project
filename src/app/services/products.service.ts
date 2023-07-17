import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AddProduct, Order, Product, UpdateProduct } from '../data-type';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnInit{

  constructor(private prod:HttpClient, private route:Router) { }
  baseUrl:string = 'http://localhost:3000';

  setProducts(data:AddProduct){
    return this.prod.post(`${this.baseUrl}/Products`,data);
  }

  getAllProducts(){
    return this.prod.get<UpdateProduct[]>(`${this.baseUrl}/Products`);
  }

  getProductsById(id:number){
    return this.prod.get<Product>(`${this.baseUrl}/Products/${id}`);
  }

  updateProducts(id:number,data:UpdateProduct){
    return this.prod.put(`${this.baseUrl}/Products/${id}`,data);
  }

  deleteProd(id:number){
    return this.prod.delete(`${this.baseUrl}/Products/${id}`);
  }

  trendySearches(query:string){
    return this.prod.get(`${this.baseUrl}/Products?q=${query}`);
  }

  popularProducts(){
    return this.prod.get(`${this.baseUrl}/Products?_limit=3`)
  }

  localCart(data:Product){
    let cartData = [];
    let localCart = localStorage.getItem("localCart");
    if(!localCart){
      localStorage.setItem("localCart",JSON.stringify([data]));
    }
    else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem("localCart",JSON.stringify(cartData));
    }
  }

  removeCart(id:number|undefined){
    let localCart = localStorage.getItem("localCart");
    let products = localCart && JSON.parse(localCart);
    products = products.filter((res:Product)=> id !== res.id);
    // console.log(products);
    localStorage.setItem("localCart",JSON.stringify(products))
  }

  orderNow(body:Order){
    return this.prod.post(`${this.baseUrl}/orders`,body);
  }

  getAllOrdersByUserId(userId:number){
    return this.prod.get(`${this.baseUrl}/orders?userId=${userId}`);
  }

  deleteOrder(orderId:number){
    return this.prod.delete(`${this.baseUrl}/orders/${orderId}`);
  }

  search = new Subject();
  searchProduct(query:string){
    // ********** Sending value from header to search component through Subject **********
    // return this.prod.get(`${this.baseUrl}/Products?q=${query}`,{ observe : 'response'}).subscribe((res:any)=>{
    //   if(res.body.length !== 0){
    //     console.log("Product Found!!");
    //     this.search.next(res.body);
    //   }
    //   else {
    //     console.log("Product Not Found!!");
    //     this.route.navigate(['No-Product'])
    //   }
    // })

    // Just subscribing this in search component
    return this.prod.get(`${this.baseUrl}/Products?q=${query}`);
  }

  ngOnInit(): void {
    
  }
}
