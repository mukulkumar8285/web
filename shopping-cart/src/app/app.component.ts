import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importing standalone components
import { CartComponent } from './cart/cart.component';
import { ItemListComponent } from './item-list/item-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterCartComponent } from './footer-cart/footer-cart.component';
import { AuthuserComponent } from './authuser/authuser.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    CartComponent,
    ItemListComponent,
    NavbarComponent,
    FooterCartComponent,
    AuthuserComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-cart';
  isAuth: boolean = true; // Property to track if the user is on an auth page

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const authRoutes = ['/login', '/register'];
        this.isAuth = authRoutes.includes(event.urlAfterRedirects); // Use urlAfterRedirects
        console.log(`Current URL: ${event.urlAfterRedirects}, isAuth: ${this.isAuth}`); // Debug output
      }
    });
  }
}
