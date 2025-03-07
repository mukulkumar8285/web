import { Routes } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { CartComponent } from './cart/cart.component';
import { AddCartComponent } from './add-cart/add-cart.component';
import { AuthuserComponent } from './authuser/authuser.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsuccessComponent } from './paymentsuccess/paymentsuccess.component';
import { WomenItemListComponent } from './women-item-list/women-item-list.component';
import { MenItemListComponent } from './men-item-list/men-item-list.component';
import { UserinfoComponent } from './userinfo/userinfo.component';

export const routes: Routes = [
    // { path: 'dashboard', component: ItemListComponent   },
    // { path: 'cart', component: CartComponent , canActivate:[AuthGuard] },
    // { path: 'add-cart', component: AddCartComponent  , canActivate:[AuthGuard]},
    // {path:'item-detail/:id' , component:ItemDetailComponent , canActivate:[AuthGuard]},
    // {path: "wishlist" , component:WishlistComponent , canActivate:[AuthGuard]},
    // {path : 'payment' , component:PaymentComponent , canActivate:[AuthGuard]},
    // {path : 'payment-success' , component:PaymentsuccessComponent , canActivate:[AuthGuard]},
    // { path: 'login', component: AuthuserComponent },
    // {path: 'register' , component:RegisterComponent},
    // {path: '' , component:LoginComponent}
    { path: '', component: ItemListComponent , canActivate:[AuthGuard]   },
    { path: 'cart', component: CartComponent  , canActivate:[AuthGuard]},
    { path: 'add-cart', component: AddCartComponent , canActivate:[AuthGuard]  },
    {path:'item-detail/:id' , component:ItemDetailComponent , canActivate:[AuthGuard]},
    {path: "wishlist" , component:WishlistComponent, canActivate:[AuthGuard] },
    {path : 'payment' , component:PaymentComponent , canActivate:[AuthGuard]},
    {path : 'payment-success' , component:PaymentsuccessComponent , canActivate:[AuthGuard] },
    { path: 'login', component: AuthuserComponent },
    {path: 'register' , component:RegisterComponent },
    {path: 'women-item' , component:WomenItemListComponent , canActivate:[AuthGuard]},
    {path: 'men-item' , component:MenItemListComponent , canActivate:[AuthGuard]},
    {path: 'account-info' , component:UserinfoComponent , canActivate:[AuthGuard]},


 

// canActivate:[AuthGuard]

];
