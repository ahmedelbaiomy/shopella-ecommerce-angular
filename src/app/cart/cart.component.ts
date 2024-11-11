import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  itemCount:number = 1;
  cartItems:any=null;
  isLoading:boolean = false;


  constructor(private _CartService:CartService){}
  ngOnInit(): void {
    this.isLoading = true;
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartItems = res.data;
        this.isLoading = false;
        // console.log(res)
      },
    })
  }
}
