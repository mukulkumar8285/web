import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userKey = 'user'; 
  constructor(private router : Router) { }

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
