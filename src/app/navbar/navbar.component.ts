import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  isLoggedIn:boolean = false;
  numberOfCartItems:number = 0;
  cartItemCount$ = this._CartService.cartItemCount$;
  constructor(private _authService:AuthService,private _CartService:CartService){
  _authService.userData.subscribe({
    next: () => {
      if(_authService.userData.getValue() !== null){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    }
  })
 }

 ngOnInit(){
  this._authService.userData;
  this._CartService.refreshCartItemsCount();
 }
 onLogout(){
  this._authService.logout();
 }

}
