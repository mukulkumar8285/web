import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-cart',
  standalone: true,
  imports: [CommonModule , HttpClientModule , FormsModule ],
  templateUrl: './add-cart.component.html',
  styleUrl: './add-cart.component.css'
})
export class AddCartComponent {
cartItem = {
  name: '',
  price: 0,
  img : '',
  size:'',
  color:'',
  description : '',
  material: '',
  discount:'',

}

constructor(private http : HttpClient){}

onSubmit(){
  this.http.post("http://localhost:3000/api/items" , this.cartItem).subscribe(
    (response) => {
      console.log(response);
      this.cartItem = {
        name: '',
        price: 0,
        img : '',
        size:'',
        color:'',
        description : '',
        material : '',
        discount : '',
      };
    },(error)=>{
      console.log(error);
    }
  )
}
}
