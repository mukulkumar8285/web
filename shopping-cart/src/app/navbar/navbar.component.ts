import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

accountInfoData = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authservice: AuthService
  ) {}

  onHome() {
    this.router.navigate(['/']);
  }
  onCart() {
    this.router.navigate(['/cart']);
  }
  onAdd() {
    this.router.navigate(['/add-cart']);
  }
  wishlist() {
    this.router.navigate(['/wishlist']);
  }
  WomenPage() {
    this.router.navigate(['/women-item']);
  }
  MenPage() {
    this.router.navigate(['/men-item']);
  }
  accountInfo() {
    this.router.navigate(['/account-info']);
  }

  onLogout() {
    this.authservice.logout();

    this.http.post('http://localhost:3000/auth/logout', {}).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
