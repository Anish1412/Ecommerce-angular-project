import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { UpdateProduct } from '../data-type';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{

  faEdit = faEdit;
  faTrash = faTrash;
  constructor(private prod:ProductsService, private route:Router){}

  prodList!: UpdateProduct[];
  getProducts(){
    this.prod.getAllProducts().subscribe((res)=>{
      this.prodList = res;
    });
  }

  delete(id:number){
    this.prod.deleteProd(id).subscribe((res)=>{
      this.getProducts();
      console.log(res);
    })
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
