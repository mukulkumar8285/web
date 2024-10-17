import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'] // Fixed 'styleUrls' instead of 'styleUrl'
})
export class WishlistComponent implements OnInit {
  likedItems: any[] = [];
  items: any[] = []; // This can be removed if not used elsewhere

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
   this.likeItem();
  }

  likeItem(){
    const user = this.authService.getUser();

    if (!user) {
      console.error('User is not logged in');
      return;
    }
    
    const userId = user._id || user.id; // Renamed 'UserId' to 'userId' for consistency
    this.http.get(`http://localhost:3000/user/${userId}/liked-items`).subscribe(
      (response: any) => {
        this.likedItems = response.likedItems;
        console.log(this.likedItems);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  removeItem(item: any) {
    const itemId = item._id || item.id;
    console.log(itemId);
    
    this.http.post(`http://localhost:3000/user/items/${itemId}/like`, { UserId: this.authService.getUser()._id }) // Send UserId in request body
        .subscribe(
            (response: any) => {
                console.log(response);
                if (response.message === 'Unlike removed successfully') { 
                   
                    this.likedItems = this.likedItems.filter(i => i._id !== itemId);
                } else if (response.message === 'Like added successfully') {
                    
                }
            },
            (error) => {
                console.error(error);
            }
        );
      setTimeout(()=>{
        this.likeItem();
      }, 1000)
        
  }
  
}
