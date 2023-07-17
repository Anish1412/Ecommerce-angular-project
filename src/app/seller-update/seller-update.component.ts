import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { UpdateProduct } from '../data-type';

@Component({
  selector: 'app-seller-update',
  templateUrl: './seller-update.component.html',
  styleUrls: ['./seller-update.component.css']
})
export class SellerUpdateComponent implements OnInit{
  constructor(private prod:ProductsService,private uid:ActivatedRoute, private route:Router){}

  id!:number;
  UpdateProd(data:NgForm){
    console.log(data.value);
    this.prod.updateProducts(this.id,data.value).subscribe((res)=>{
      // console.log(res);
      this.route.navigate(['Seller-home']);
    })
  }

  resetData(data:NgForm){
    data.reset();
  }

  // We store the object came from API in a variable
  value!:UpdateProduct | undefined;
  getProductsById(){
    this.prod.getProductsById(this.id).subscribe((res)=>{
      // console.log(res);
       this.value = res;
    })
  }

  ngOnInit(): void {
      this.uid.params.subscribe((res)=>{
        this.id = res['id'];
      })
      this.getProductsById();
  }
}
