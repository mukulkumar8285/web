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
  userId: string; // If you need to keep track of the user ID
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private userKey = 'user'; 
  
  constructor(private router : Router ) { }

  setUser(userInfo: any) {
    console.log("Setting user:", userInfo);
    localStorage.setItem(this.userKey, JSON.stringify(userInfo)); 
  }
  getUser() {
    const user = localStorage.getItem(this.userKey);
    console.log("Getting user:", user);
    return user ? JSON.parse(user) : null; 
  }

  
  logout() {
    this.clearUser();
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
  }

  isLogging() {
    return this.getUser() !== null || !!localStorage.getItem('token');; 
  }


  clearUser() {
    localStorage.removeItem(this.userKey); 
  }
}
