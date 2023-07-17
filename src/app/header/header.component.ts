import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Subject, distinct, filter } from 'rxjs';
import { Product, UpdateProduct } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // **********  TUTORIAL LOGIC ***********
  constructor(private route: Router, private prod: ProductsService, private user:UserService) {}

  sellerlogout() {
    localStorage.removeItem("Seller");
    this.route.navigate(['']);
  }

  userLogout(){
    localStorage.removeItem("User");
    this.route.navigate(['/user-auth']);
    location.replace('/user-auth');
  }

  // Checks Orders are available or not (My Logic)
  isOrdersDone(){
    if(localStorage.getItem("User")){
    let user = localStorage.getItem("User");
    let userData = user && JSON.parse(user);
    let userId = userData.id;
    this.prod.getAllOrdersByUserId(userId).subscribe((res:any)=>{
      if(res.length){
        this.route.navigate(['my-orders']);
      }
      else {
        this.route.navigate(['']);
      }
    })
  }
  }

  Fruits!: string;

  searches: any;
  trendySearches(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      if(element.value == null || element.value == ""){
        this.searches = undefined;
      }
      else {
        this.prod.trendySearches(element.value)
        .subscribe((res:any) => {
          this.searches = res;
          console.log(res);
        });
      }
    }
  }


  // ******** Searches keywords *********
  searchKeywords:string = "";
  find(id:number,search:string){
    this.searchKeywords = search;
    this.searches = undefined;
    this.route.navigate([`details/${id}`]);
    location.replace(`/details/${id}`);
  }

  searchProduct(){
    // For sending from Header to Search through Subject
    // this.prod.searchProduct(this.searchKeywords);
    this.route.navigate([`search/${this.searchKeywords}`]);
    location.replace(`/search/${this.searchKeywords}`);
  }

  hidesearch(){
    this.searches = undefined;
  }

  navbar: string = 'default';
  sellerName: string = '';
  userName: string = '';
  cartItems:number = 0;
  ngOnInit(): void {
    if(!localStorage.getItem("User")){
      if(localStorage.getItem("localCart")){
        let localCart = localStorage.getItem("localCart");
        let products = localCart && JSON.parse(localCart);
        // console.log(products.length);
        this.cartItems = products.length;
      }
    }
    else {
      let user = localStorage.getItem("User");
      let userData = user && JSON.parse(user);
      let userId = userData.id;
      this.user.getProductsByUserId(userId).subscribe((res:any)=>{
        this.cartItems = res.length;
      })
    }


    this.route.events.subscribe((res: any) => {
      if (res.url) {
        // console.log(res.url);
        // 1) I need to use res.url.includes('Add-Product') in if condition bcoz, by clicking on "Add-Product"
        //  link the navbar takes "default" value, and then it returns to default value navbar which i used in html.
        // 2) And beside res.url.includes('Add-Product') i need to use localStorage.getItem("Seller") bcoz,
        //  without it, Authentication dosesn't work which we done in app-routing.module.ts
        if (
          (localStorage.getItem('Seller') && res.url.includes('Seller')) ||
          (localStorage.getItem('Seller') && res.url.includes('Add-Product')) ||
          (localStorage.getItem('Seller') && res.url.includes('Update-Product'))
        ) {
          // console.log("In Seller area");
          this.navbar = 'Seller';
          if (localStorage.getItem('Seller')) {
            let sellerStore = localStorage.getItem('Seller');
            let sellerData = sellerStore && JSON.parse(sellerStore);

// 1) When we register, we didn't get object of user in Array from localStorage. But, if we login we get 
//    object of user in Array from localStorage
// 2) So, on the basis of that we have to check it, and then we have to pass the value to display the username
            if(Array.isArray(sellerData)){
              sellerData = sellerStore && JSON.parse(sellerStore)[0];
              this.sellerName = sellerData.Name;
            }
            else {
              sellerData = sellerStore && JSON.parse(sellerStore);
              this.sellerName = sellerData.Name;
            }
          }
        }
        else if(localStorage.getItem("User")){
          let userStore = localStorage.getItem("User");
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.username;
          this.navbar = "User"
          // location.replace('');
        }
        else {
          // console.log("OutSide Seller area");
          this.navbar = 'default';
        }
      }
    });
  }

  // ********** MY LOGIC ************
  //  constructor(private route:Router) {}

  //  logout(){
  //   localStorage.clear();
  //   this.route.navigate(['']);
  //  }
  // navbar:boolean = false;
  // sellerName:string = '';
  // ngOnInit(): void {
  //     this.route.events.subscribe((res:any)=>{
  //       if(res.url){
  //         console.log(res.url);
  //         if(localStorage.getItem("Seller") && res.url.includes("Seller") || localStorage.getItem("Seller") && res.url.includes("Add-Product")){
  //           this.navbar = true;
  //           if(localStorage.getItem("Seller")){
  //             let sellerStore = localStorage.getItem("Seller");
  //             let sellerData = sellerStore && JSON.parse(sellerStore)[0];
  //             this.sellerName = sellerData.Name;
  //           }
  //         }
  //         else {
  //           this.navbar = false;
  //         }
  //       }
  //     })
  // }
}
