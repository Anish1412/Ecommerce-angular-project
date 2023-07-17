import { Component, OnInit } from '@angular/core';
import { ECommService } from '../services/seller.service';
import { ProductsService } from '../services/products.service';
import { AddProduct, Product, UpdateProduct } from '../data-type';
import { distinct, filter, from, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private prod:ProductsService) {}

  popularProducts: Product[] | undefined;

  products!:Product[] | undefined;
  ngOnInit(): void {
      this.prod.getAllProducts()
      .subscribe((res:any)=>{
        // console.log(res);
        this.products = res;
      })

      this.prod.popularProducts().subscribe((res:any)=>{
        // console.log(res);
        this.popularProducts = res;
      })
  }

}
