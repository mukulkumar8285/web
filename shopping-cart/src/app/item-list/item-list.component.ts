import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
declare var handleSignOutButton: any;

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  filterText: string = '';
  filterdata: any[] = [];
  filterWom: any[] = [];
  Deals: any[] = [];

  userProfile: any;
  isWishlisted = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/api/items').subscribe(
      (response) => {
        this.items = response;
        if (Array.isArray(response)) {
          this.filterdata = response.filter(
            (item: any) => item.category !== 'Woman' && item.discount !== 75
          );
          this.filterWom = response.filter(
            (item: any) => item.category === 'Woman' && item.discount !== 75
          );
          this.Deals = response.filter((item: any) => item.discount === 75);
        }
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );

    this.autoSlide();

    this.userProfile = JSON.parse(sessionStorage.getItem('loggedInUser') || '');
  }
  handleSignOut() {
    sessionStorage.removeItem('loggedInUser');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
      handleSignOutButton();
    });
  }
  ItemDetail(item: any) {
    this.router.navigate(['/item-detail', item._id]);
  }
  truncateName(name: string, length: number = 20): string {
    return name.length > length ? name.substring(0, length) + '...' : name;
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

  filterItems(): void {
    const searchText = this.filterText.toLowerCase();

    this.filterdata = this.items.filter((item) =>
      item.name.toLowerCase().includes(searchText)
    );
    this.filterWom = this.filterdata.filter(
      (item) => item.category === 'Woman'
    );
    this.Deals = this.filterdata.filter((item) => item.discount === 75);
  }

  toggleWishlist(item: any) {
    this.isWishlisted = !this.isWishlisted;

    const user = this.authService.getUser();

    if (!user) {
      console.error('User is not logged in');
      return;
    }

    const UserId = user._id || user.id;
    console.log('UserId:', UserId);
    const itemId = item.id || item._id;

    this.http
      .post(`http://localhost:3000/user/items/${itemId}/like`, { UserId })
      .subscribe(
        (response: any) => {
          console.log('Item liked:', response);
          item.likesCount = response.item.likes.length;
        },
        (error) => {
          console.error(error);
        }
      );
  }
  // toggleWishlist(item: any) {
  //   console.log('Wishlist toggled for', item.name);
  // }
  sliderItems = [
    {
      img: 'https://images.bewakoof.com/uploads/grid/app/DESKTOP-last-sizes-left--1--1736586547.jpg',
      name: 'Multicolor Polo T-Shirt',
      price: '₹500',
    },
    {
      img: 'https://images.bewakoof.com/uploads/grid/app/DESKTOP-last-sizes-left--1--1736586547.jpg',
      name: 'Stylish Denim Jacket',
      price: '₹1200',
    },
    {
      img: 'https://images.bewakoof.com/uploads/grid/app/DESKTOP-last-sizes-left--1--1736586547.jpg',
      name: 'Casual Summer Dress',
      price: '₹999',
    },
  ];

  currentIndex = 0;
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.sliderItems.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.sliderItems.length) %
      this.sliderItems.length;
  }

  autoSlide() {
    setInterval(() => {
      this.nextSlide();
    }, 3000); // Auto-slide every 3 seconds
  }
}
