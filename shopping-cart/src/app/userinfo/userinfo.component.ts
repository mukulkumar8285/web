import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-userinfo',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css'],
})
export class UserinfoComponent implements OnInit {
  userId: string = '';
  userAddress: any = null;
  loading: boolean = true;
  errorMessage: string = '';
  usershow :boolean =  false;
  showdata : any = []

  address = {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    mobile : '',
  };

  constructor(private http: HttpClient, private authservice: AuthService) {}

  ngOnInit() {
    const user = this.authservice.getUser();
    console.log('userdata', user._id);
    this.showdata = user
    this.userId = user._id;
    this.fetchUserAddress();
  }
  toggleEdit(){}
  fetchUserAddress() {
    this.http
      .get(`http://localhost:3000/api/user/address/${this.userId}`)
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.usershow = true;
            this.userAddress = data;
            this.address = { ...data };
          }
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'No address found, please enter your details.';
          this.loading = false;
        },
      });
  }

  // Submit or update user address
  submitUserAddress() {
    this.http
      .post(`http://localhost:3000/api/user/address`, {
        userId: this.userId,
        ...this.address,
      })
      .subscribe({
        next: (response) => {
          console.log(this.address.state);

          console.log('Address saved:', response);
          this.fetchUserAddress();
        },
        error: () => {
          this.errorMessage = 'Failed to save address';
        },
      });
  }
}
