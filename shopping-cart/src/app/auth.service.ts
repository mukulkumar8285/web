import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userKey = 'user';

  constructor(private router: Router, private http: HttpClient) {}

  setUser(userInfo: any) {
    console.log('Setting user:', userInfo);
    localStorage.setItem(this.userKey, JSON.stringify(userInfo));
  }
  getUser() {
    const user = localStorage.getItem(this.userKey);
    console.log('Getting user:', user);
    return user ? JSON.parse(user) : null;
  }

  logout() {
    this.clearUser();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLogging() {
    return this.getUser() !== null || !!localStorage.getItem('token');
  }

  clearUser() {
    localStorage.removeItem(this.userKey);
  }

  fetchUserAddress(): Observable<Address> {
    const user = this.getUser();
    if (!user || !user._id) {
      throw new Error('User ID is missing');
    }

    return this.http.get<Address>(
      `http://localhost:3000/api/user/address/${user._id}`
    );
  }
}
