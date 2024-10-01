import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ItemListComponent } from './item-list/item-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterCartComponent } from './footer-cart/footer-cart.component';
import { AuthuserComponent } from './authuser/authuser.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule , AuthuserComponent , CartComponent  , NavbarComponent , ItemListComponent , FooterCartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shopping-cart';
}
