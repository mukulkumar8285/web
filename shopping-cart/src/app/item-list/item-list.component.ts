import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule , HttpClientModule , FormsModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  filterText : string = '';
  filterdata : any[] = [];

  constructor(private http : HttpClient  , private authService : AuthService , private router : Router) {}

  ngOnInit(): void {
   this.http.get<any>("http://localhost:3000/api/items").subscribe(
    (response) => {
      this.items = response;
      this.filterdata = response;
      console.log(response);
      },
      (error) => {
        console.error(error);
        }
      
   )
  }
  
  ItemDetail(item : any){
    this.router.navigate(["/item-detail" , item._id])
  }
  truncateName(name: string): string {
    return name.length > 30 ? name.substring(0, 50) + '...' : name;
  }
  // addToCart(item: any): void {
  //   const user = this.authService.getUser(); 

  //   if (!user) {
  //     console.error('User is not logged in');
  //     return;
  //   }
    
  //   const UserId = user._id || user.id;
  //   console.log("UserId:", UserId);


  //   const qty = 1;
  //   this.http.post(`http://localhost:3000/api/items/add-to-cart` ,  {name : item.name , rate : item.rate , qty , img : item.img , UserId}).subscribe(response => {
  //     console.log('Item added to cart:', response);
  //     item.addedToCart = true;
  //   },
  //   (error)=>{
  //     console.error(error);
  //   }
  // );
  // }

  filterItems() : void{
    this.filterdata = this.items.filter(item =>(
      item.name.toLowerCase().includes(this.filterText.toLowerCase())
    ))
  }
  // /items/:itemId/like
  // LikeClick(item : any){
  // const user = this.authService.getUser(); 

  //   if (!user) {
  //     console.error('User is not logged in');
  //     return;
  //   }
    
  //   const UserId = user._id || user.id;
  //   console.log("UserId:", UserId);
  //   const itemId = item.id || item._id;

  //   this.http.post(`http://localhost:3000/user/items/${itemId}/like`, {UserId}).subscribe(
  //     (response : any) => {
  //       console.log('Item liked:', response);
  //       item.likesCount = response.item.likes.length;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   )

  // }
  
}
