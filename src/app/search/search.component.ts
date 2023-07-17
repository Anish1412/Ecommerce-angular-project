import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private prod:ProductsService,private jitu:ActivatedRoute,private route:Router) {}

  Product:Product[] | undefined;
  query!:string;
  ngOnInit(): void {
    // ********* through Subject from service *********
    // this.prod.search.subscribe((res:any)=>{
    //     console.log(res);
    //     this.Product = res;
    //   })
      
      this.jitu.params.subscribe((res)=>{
        this.query = res['query']
        console.log(res['query']);
      })

      // ******** Subscribing function directly here from Service... *********
      this.prod.searchProduct(this.query).subscribe((res:any)=>{
        if(res.length !== 0){
          console.log("Product Found!!");
          this.Product = res;
        }
        else {
          console.log("Product Not Found!!");
          this.route.navigate(['No-Product'])
        }
      })
    }
    

  }
