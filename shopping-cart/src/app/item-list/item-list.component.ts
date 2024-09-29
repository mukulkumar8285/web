import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule , HttpClientModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {
  items: any[] = [];

  constructor(private http : HttpClient ) {}

  ngOnInit(): void {
   this.http.get<any>("http://localhost:3000/api/items").subscribe(
    (response) => {
      this.items = response;
      },
      (error) => {
        console.error(error);
        }
      
   )
  }
  addToCart(item: any): void {
    const qty = 1;
    this.http.post(`http://localhost:3000/api/items/add-to-cart` ,  {name : item.name , rate : item.rate , qty}).subscribe(response => {
      console.log('Item added to cart:', response);
      item.addedToCart = true;
    },
    (error)=>{
      console.error(error);
    }
  );
  }
}
