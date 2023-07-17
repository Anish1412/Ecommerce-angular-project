import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  constructor(private prod:ProductsService, private route:Router) {}

  prodAdd:string = '';
  AddProd(data:NgForm){
    // console.log(data.value);
    this.prod.setProducts(data.value).subscribe((res)=>{
      console.log(res);
      this.route.navigate(['Seller-home']);
      
      if(res){
        this.prodAdd = 'Product has been Added Successfully!!';
      }
      setTimeout(()=>{
        this.prodAdd = '';
      },3000);
    });
  }
  
  resetProd(data:NgForm){
    data.reset();
  }
}
