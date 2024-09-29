import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

constructor(private http : HttpClient , private router : Router){};

onHome(){
  this.router.navigate(["/"]);
}
onCart(){
  this.router.navigate(["/cart"]);
}
onAdd(){
  this.router.navigate(["/add-cart"])
}


}
