import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ToasterService } from '../services/toastr.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  itemCount:number = 1;
  cartItems:any=null;
  isLoading:boolean = false;


  constructor(private _CartService:CartService,private _toastr:ToasterService){}
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

  removeItem(id:string){
    this._CartService.removeCartItem(id).subscribe({
      next: (res) => {
        this._toastr.toastrSuccess(res.data.message)
        this.cartItems = res.data;
        this._CartService.refreshCartItemsCount();
      },
      error: (err) => {this._toastr.toastrError(err.data.message)}
    })
  }

  updateItemQuantity(id:string,count:number){
    this._CartService.updateCartItemQuantity(id,count).subscribe({
      next:(res)=>{
        this.cartItems = res.data
        this._toastr.toastrSuccess(res.data.message);
      },
      error: (err) => {this._toastr.toastrError(err.data.message)}
    })
  }
}
