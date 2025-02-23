import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {  ElementRef, ViewChild , AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css',
})
export class ItemDetailComponent implements OnInit ,AfterViewInit {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  selectedItem: any;
  itemId: string | null = null;
  item: any = {};
  comment: String | null = null;
  items: any[] = [];
  visibleItems: any[] = [];
  showAll: boolean = false;
  itemsToShow: number = 8;
  setImage: any;
  private currentIndex = 0;
  private intervalId: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
  ngAfterViewInit() {
    this.startAutoScroll();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.itemId = params.get('id');
      this.fetchItemDetails();
      this.fetchItems();
    });
  }
  ItemDetail(item: any) {
    this.router.navigate(['/item-detail', item._id]);
  }
  startAutoScroll() {
    this.intervalId = setInterval(() => {
      if (this.carousel && this.selectedItem?.img.length > 1) {
        const container = this.carousel.nativeElement;
        const totalImages = this.selectedItem.img.length;
        
        this.currentIndex = (this.currentIndex + 1) % totalImages;
        const scrollAmount = this.currentIndex * 210; // Adjust based on image height
        
        container.style.transform = `translateY(-${scrollAmount}px)`;
      }
    }, 3000); // Change image every 3 seconds
  }
  fetchItemDetails(): void {
    if (this.itemId) {
      this.http
        .get(`http://localhost:3000/api/items/item-detail/${this.itemId}`)
        .subscribe(
          (response) => {
            this.item = response;
            this.selectedItem = this.item;
            this.setImage = this.selectedItem?.img[0];
            console.log('this.selectedItem', response);
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }
  changeMainImage(image: string) {
    this.setImage = image; // Update main image when thumbnail is clicked
  }
  // // /items/:itemId/comments
  addTocart(item: any): void {
    const user = this.authService.getUser();

    if (!user) {
      console.error('User is not logged in');
      return;
    }

    const UserId = user._id || user.id;
    console.log('UserId:', item);
    const qty = 1;
    this.http
      .post(`http://localhost:3000/api/items/add-to-cart`, {
        name: this.selectedItem.name,
        price: this.selectedItem.price,
        discount: this.selectedItem.discount,
        size: this.selectedItem.size,
        rate: this.selectedItem.rate,
        qty,
        img: this.setImage,
        description : this.selectedItem.description,
        UserId,
      })
      .subscribe(
        (response) => {
          console.log('Item added to cart:', response);
          item.addedToCart = true;
          alert('Item added to cart');
        },
        (error) => {
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
    this.http
      .post(`http://localhost:3000/user/items/${itemId}/like`, { UserId }) // Send userId in request body
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.message === 'Like added successfully') {
            alert('Item added to wishlist');
            const likedItem = this.items.find((i) => i.id === itemId);
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
  fetchItems(): void {
    this.http.get<any>('http://localhost:3000/api/items').subscribe(
      (response) => {
        this.items = response;
        this.visibleItems = this.items.slice(0, this.itemsToShow); 
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  loadMoreItems(): void {
    this.itemsToShow += 8; // Increase the number of items shown by 8
    this.visibleItems = this.items.slice(0, this.itemsToShow);
  }
  truncateName(name: string): string {
    return name.length > 30 ? name.substring(0, 50) + '...' : name;
  }
  // /items/:itemId/comments
  addComment() {
    const itemId = this.selectedItem._id || this.selectedItem.id;
    const user = this.authService.getUser();

    if (!user) {
      console.error('User is not logged in');
      return;
    }

    const UserId = user._id || user.id;
    console.log('userId', UserId);
    this.http
      .post(`http://localhost:3000/user/items/${itemId}/comments`, {
        UserId: UserId,
        comment: this.comment,
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.comment = '';
        },
        (error) => {
          console.error(error);
        }
      );
  }
 
}
