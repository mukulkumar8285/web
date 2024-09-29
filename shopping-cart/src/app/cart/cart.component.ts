import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule , HttpClientModule ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: { name: string , rate : number , qty: number }[] = [];
  constructor(private http : HttpClient) {};

  ngOnInit(): void {
    // This is where you would make your API call to get the cart items
    this.http.get<{ name: string;rate:number ,  qty: number }[]>("http://localhost:3000/api/items/cart").subscribe(
      (response) => {
        this.cartItems = response;
      },(error) => {
        console.error(error);
      }
    )
  }


  addToCart(name: string, rate: number, qty: number): void {
    this.http.post('http://localhost:3000/api/items/add-to-cart', { name, rate, qty }).subscribe(
      (response) => {
        console.log('Item added to cart:', response);
        const existingItem = this.cartItems.find(item => item.name === name);
        if (existingItem) {
          existingItem.qty += qty;
        } else {
          this.cartItems.push({ name, rate, qty }); 
        }
      },
      (error) => {
        console.error('Error adding item to cart:', error);
      }
    );
  }
  subToCart(name: string  , qty: number): void {
    this.http.post('http://localhost:3000/api/items/sub-to-cart', { name,qty}).subscribe(
      (response) => {
        const existingItem = this.cartItems.find(item => item.name === name);
        if (existingItem) {
          existingItem.qty -= qty;  
       if(existingItem.qty <= 0) {
          const index = this.cartItems.indexOf(existingItem);
          this.cartItems.splice(index, 1);
        }
      }
      },
      (error)=>{
        console.error('Error substracting item from cart:', error);
      }
    )

  }

  getTotalAmout(): number{
    return this.cartItems.reduce((total , item) => total+(item.rate * item.qty), 0)
  
  }

    getCartItemsCount(): number {
    return this.cartItems.length;
  }

 
}
