import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../services/toastr.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  isLoading:boolean=false;
  cartId!:string | null;
  constructor(private _cartService:CartService,private _Router:Router,private _activatedRoute:ActivatedRoute,private _toastr:ToasterService){
    this.cartId =this._activatedRoute.snapshot.paramMap.get('cartId');
  }

  shippingAddress:FormGroup = new FormGroup({
    details: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    });


    onSubmit(form:FormGroup){
      if(form.valid){
        if (this.cartId) {
        this.isLoading=true;
        this._cartService.onlinePayment(form.value,this.cartId!).subscribe({
          next: (res) => {
            console.log(res);
            this.isLoading = false;
            this.navigateToPage(res.session.url);
          },
          error: (err) => {
            console.error(err);
            this.isLoading = false;
            this._toastr.toastrError('Payment failed. Please try again.');
          },
        })
      }else{
        this._toastr.toastrError('Cart Id is missing');
      }
      }else{
        this._toastr.toastrError('Invalid form data.');
      }
    }

    navigateToPage(url:string){
      window.location.href = url;
    }
}
