import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
declare var Razorpay: any;

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [FormsModule , HttpClientModule , CommonModule],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent implements OnInit {
  items: any[] = [];
  selectedItem: any;
  itemId: string | null = null;
  item: any = {};
  comment : String | null = null ;

  constructor(private http : HttpClient, private router : Router , private authService : AuthService , private route : ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id'); 
      this.fetchItemDetails();
      this.fetchItems();
    });
  }
  ItemDetail(item : any){
    this.router.navigate(["/item-detail" , item._id])
  }
  fetchItemDetails(): void {
    if (this.itemId) {
      this.http.get(`http://localhost:3000/api/items/item-detail/${this.itemId}`).subscribe(
        (response) => {
          this.item = response;
          this.selectedItem = this.item;
          console.log("this.selectedItem" , response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  // // /items/:itemId/comments
   addTocart(item: any): void {
      const user = this.authService.getUser(); 
  
      if (!user) {
        console.error('User is not logged in');
        return;
      }
      
      const UserId = user._id || user.id;
      console.log("UserId:", item);
      const qty = 1;
      this.http.post(`http://localhost:3000/api/items/add-to-cart` ,  {name : this.selectedItem.name,price : this.selectedItem.price, discount:this.selectedItem.discount, size:this.selectedItem.size , rate : this.selectedItem.rate , qty , img : this.selectedItem.img , UserId}).subscribe(response => {
        console.log('Item added to cart:', response);
        item.addedToCart = true;
      },
      (error)=>{
        console.error(error);
      }
    );
    }

    SaveList(item: any) {
      const user = this.authService.getUser(); 
  
      if (!user) {
        console.error('User is not logged in');
        return;
      }
      
      const UserId = user._id || user.id;
      const itemId = item._id || item.id;
      console.log(itemId);
      this.http.post(`http://localhost:3000/user/items/${itemId}/like`, {UserId }) // Send userId in request body
          .subscribe(
              (response: any) => {
                  console.log(response);
                  if (response.message === 'Like added successfully') { 
                      const likedItem = this.items.find(i => i.id === itemId);
                      if (likedItem) {
                          likedItem.likes += 1; 
                      }
                  }
              },
              (error) => {
                  console.error(error);
              }
          );
  }
    fetchItems():void{
    this.http.get<any>("http://localhost:3000/api/items").subscribe(
     (response) => {
       this.items = response;
      //  this.filterdata = response;
      console.log(response);
       },
       (error) => {
         console.error(error);
         }
       
    )
   }
   truncateName(name: string): string {
    return name.length > 30 ? name.substring(0, 50) + '...' : name;
  }
  // /items/:itemId/comments
  addComment(){
    const itemId = this.selectedItem._id || this.selectedItem.id;
    const user = this.authService.getUser(); 
  
    if (!user) {
      console.error('User is not logged in');
      return;
    }
    
    const UserId = user._id || user.id;
    console.log("userId" , UserId);
    this.http.post(`http://localhost:3000/user/items/${itemId}/comments` , {UserId : UserId ,comment : this.comment}).subscribe(
      (response) => {
        console.log(response);
        this.comment = '';
      },
      (error)=>{
        console.error(error);
      }
    )
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

