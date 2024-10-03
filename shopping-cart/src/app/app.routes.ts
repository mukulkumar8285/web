import { Routes } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { CartComponent } from './cart/cart.component';
import { AddCartComponent } from './add-cart/add-cart.component';
import { AuthuserComponent } from './authuser/authuser.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: ItemListComponent  ,canActivate:[AuthGuard] },
    { path: 'cart', component: CartComponent , canActivate:[AuthGuard] },
    { path: 'add-cart', component: AddCartComponent  , canActivate:[AuthGuard]},
    { path: 'login', component: AuthuserComponent },
    {path: 'register' , component:RegisterComponent}


];
