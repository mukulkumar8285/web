import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

declare var Razorpay: any;
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService , private router : Router) {}

  ngOnInit(): void {
    this.cartItem();
  }

  cartItem() {
    const user = this.authService.getUser();

    if (!user) {
      console.error('User is not logged in');
      return;
    }

    const UserId = user._id || user.id;
    this.http.get<{ name: string; rate: number; qty: number }[]>(`http://localhost:3000/api/items/cart?UserId=${UserId}`).subscribe(
      (response: any) => {
        this.cartItems = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addToCart(name: string, rate: number, qty: number, img: string): void {
    const user = this.authService.getUser();

    if (!user) {
      console.error('User is not logged in');
      return;
    }

    const UserId = user._id || user.id;
    console.log("UserId:", UserId);
    this.http.post('http://localhost:3000/api/items/add-to-cart', { name, rate, qty, UserId, img }).subscribe(
      (response) => {
        console.log('Item added to cart:', response);
        const existingItem = this.cartItems.find(item => item.name === name);
        if (existingItem) {
          existingItem.qty += qty;
        } else {
          this.cartItems.push({ name, rate, qty, UserId, img });
        }
      },
      (error) => {
        console.error('Error adding item to cart:', error);
      }
    );
  }
  subToCart(name: string, qty: number): void {
    const user = this.authService.getUser(); 
  
    if (!user) {
      console.error('User is not logged in');
      return;
    }
    const UserId = user._id || user.id; 
    console.log("UserId:", UserId);
    this.http.post('http://localhost:3000/api/items/sub-to-cart', { name, qty, UserId }).subscribe(
      (response) => {
        const existingItem = this.cartItems.find(item => item.name === name);
        if (existingItem) {
          existingItem.qty -= qty;
  
          if (existingItem.qty <= 0) {
            const index = this.cartItems.indexOf(existingItem);
            this.cartItems.splice(index, 1); 
          }
        }
      },
      (error) => {
        console.error('Error subtracting item from cart:', error);
      }
    );
  }
  
  removeItem(item: any) {
    const user = this.authService.getUser(); 

    if (!user) {
      console.error('User is not logged in');
      return;
    }

    const UserId = user._id || user.id;
    const itemId = item.id || item._id;

    this.http.delete(`http://localhost:3000/api/items/remove-from-cart`, { 
      body: { itemId, UserId }  
    }).subscribe(
      (response: any) => {
        console.log(response);
        // Remove the item from cartItems after successful deletion
        this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== itemId);
      },
      (error) => {
        console.error(error);
      }
    );
    setTimeout(()=>{
      this.cartItem();
    }, 500)
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + (item.rate * item.qty), 0);
  }

  getCartItemsCount(): number {
    return this.cartItems.length;
  }
  
truncateName(name: string): string {
  return name.length > 30 ? name.substring(0, 50) + '...' : name;
}
pay(amount: number) {
  this.http.post('http://localhost:3000/api/payment/create-order', { amount }).subscribe((response: any) => {
      const options = {
          key: '_', // Replace with your Razorpay Key ID
          amount: response.amount, // Amount is in paise
          currency: response.currency,
          name: 'Mukul Kumar',
          description: 'Test Transaction',
          order_id: response.id, // Razorpay Order ID
          handler: (response : any) => {
              // On payment success, redirect to success page
              this.router.navigate(['/payment-success']);
          },
          modal: {
              ondismiss: () => {
                  // If payment is canceled, redirect to cancel page
                  this.router.navigate(['/payment-cancel']);
              }
          },
          prefill: {
              name: 'Customer Name',
              email: 'customer@example.com',
              contact: '9999999999',
          },
          notes: {
              address: 'Customer Address',
          },
          theme: {
              color: '#F37254',
          },
          
          method: {
              upi: true,  
              card: true, 
              netbanking: true
          },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
  });
}
}


