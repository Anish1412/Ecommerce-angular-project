import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './Guard/auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { SellerUpdateComponent } from './seller-update/seller-update.component';
import { SearchComponent } from './search/search.component';
import { NoProductFoundComponent } from './no-product-found/no-product-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { UserAuthGuard } from './Guard/user-auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyorderComponent } from './myorder/myorder.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'Seller',
    component:SellerAuthComponent
  },
  {
    path:'Seller-home',
    component:SellerHomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'Add-Product',
    component: AddProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'Update-Product/:id',
    component:SellerUpdateComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'search/:query',
    component:SearchComponent
  },
  {
    path:'No-Product',
    component:NoProductFoundComponent
  },
  {
    path:'details/:productId',
    component:ProductDetailsComponent
  },
  {
    path:'user-auth',
    component:UserAuthComponent,
    canActivate:[UserAuthGuard]
  },
  {
    path:'cart-page',
    component:CartPageComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent
  },
  {
    path:'my-orders',
    component:MyorderComponent
  }
  // {
  //   path:'**',
  //   component:PageNotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
