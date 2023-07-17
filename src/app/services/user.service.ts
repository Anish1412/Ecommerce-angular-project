import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cart } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl:string = "http://localhost:3000/";

  constructor(private user:HttpClient,private route:Router) { }

  getUserByUserName(body:any){
    return this.user.get(`${this.baseUrl}users?username=${body}`);
  }

  addUser(body:any){
    return this.user.post(`${this.baseUrl}users`,body)
  }

  getUser(body:any){
    return this.user.get(`${this.baseUrl}users?Email=${body.Email}&password=${body.password}`);
  }

  getUserById(id:number){
    return this.user.get(`${this.baseUrl}users?id=${id}`);
  }

  addProduct(body:Cart){
    let headerMsg = new HttpHeaders({
      'message':'Product has been added successfully',
      'status':'success'
    })
    return this.user.post(`${this.baseUrl}Cart`,body,{ headers: headerMsg });
  }

  deleteProductByAPIid(productApiId:number|undefined){
    return this.user.delete(`${this.baseUrl}Cart/${productApiId}`);
  }

  getProductsByUserId(id:number){
    return this.user.get(`${this.baseUrl}Cart?userId=${id}`);
  }


}
