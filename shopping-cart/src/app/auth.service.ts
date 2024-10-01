import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user : any | null

  constructor() { }

  setUser(userInfo : any){
    this.user = userInfo
  }

  getUser(){
    return this.user;
  }

  isLogging(){
    return this.user !== null
  }


}
