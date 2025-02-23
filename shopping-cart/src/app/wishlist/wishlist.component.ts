import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
declare var Razorpay: any;

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  likedItems: any[] = [];
  items: any[] = [];
  errorMessage: string = '';
  userId: string = '';
  selectedItem: any;
  address = {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    mobile: '',
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userdata = this.authService.getUser();

    if (userdata && userdata._id) {
      console.log('userdata', userdata);
      this.userId = userdata._id;
    } else {
      console.error('User data is missing');
      return;
    }
    this.likeItem();
  }

  likeItem() {
    if (!this.userId) {
      console.error('User is not logged in');
      return;
    }

    this.http
      .get(`http://localhost:3000/user/${this.userId}/liked-items`)
      .subscribe(
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

    this.http
      .post(`http://localhost:3000/user/items/${itemId}/like`, {
        UserId: this.userId,
      })
      .subscribe(
        (response: any) => {
          console.log(response);
          alert('Item removed from wishlist');
          // if (response.message === 'Unlike removed successfully') {
            // alert('Item removed from wishlist');
            this.likedItems = this.likedItems.filter((i) => i._id !== itemId);
          // }
        },
        (error) => {
          console.error(error);
        }
      );
    setTimeout(() => {
      this.likeItem();
    }, 1000);
  }

  calculateTotalAmount() {
    return this.likedItems.reduce((total, item) => total + item.rate, 0);
  }

  fetchUserAddress() {
    this.http
      .get(`http://localhost:3000/api/user/address/${this.userId}`)
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.address = { ...data };
          }
        },
        error: () => {
          this.errorMessage = 'No address found, please enter your details.';
        },
      });
  }

  pay(amount: number) {
    this.fetchUserAddress();

    const user = this.authService.getUser();
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    this.http
      .post('http://localhost:3000/api/payment/create-order', { amount })
      .subscribe((response: any) => {
        const options = {
          key: 'rzp_test_Z9MHu3v7IiVF8t',
          amount: response.amount,
          currency: response.currency,
          name: 'Mukul Kumar',
          description: 'Test Transaction',
          order_id: response.id,
          handler: (response: any) => {
            this.router.navigate(['/payment-success']);
          },
          modal: {
            ondismiss: () => {
              this.router.navigate(['/payment-cancel']);
            },
          },
          prefill: {
            name: `${user.username}`,
            email: `${user.email}`,
            contact: `${this.address.mobile}`,
          },
          notes: {
            address: `${this.address.street}`,
          },
          theme: {
            color: '#F37254',
          },
          method: {
            upi: true,
            card: true,
            netbanking: true,
          },
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();
      });
  }
  addTocart(item: any): void {
    const user = this.authService.getUser();
    console.log("item" , item);
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    const UserId = user._id || user.id;
    console.log('UserId:', item);
    const qty = 1;
    this.http
      .post(`http://localhost:3000/api/items/add-to-cart`, {
        name: item.name,
        price: item.price,
        discount: item.discount,
        size: item.size,
        rate: item.rate,
        qty,
        img: item.img[0],
        description : item.description,
        UserId,
      })
      .subscribe(
        (response) => {
          console.log('Item added to cart:', response);
          item.addedToCart = true;
          this.removeItem(item);
          alert("Item added to cart");
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
