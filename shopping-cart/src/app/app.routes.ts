import { Routes } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { CartComponent } from './cart/cart.component';
import { AddCartComponent } from './add-cart/add-cart.component';
import { AuthuserComponent } from './authuser/authuser.component';

export const routes: Routes = [
    { path: '', component: ItemListComponent },
    { path: 'cart', component: CartComponent },
    { path: 'add-cart', component: AddCartComponent },
    { path: 'login', component: AuthuserComponent },


];
