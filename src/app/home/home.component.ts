import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { ToasterService } from '../services/toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  products: any[]=[];
  isLoading:boolean = false;
  constructor(private _ProductsService:ProductsService, private _CartService:CartService,    private _toastr: ToasterService
  ) { }
  ngOnInit(): void {
    this.isLoading = true;
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.isLoading = false;
      },
    })
  }

  AddToCart(id:string){
    this._CartService.addToCart(id).subscribe({
      next: (res) => {this._toastr.toastrSuccess(res.data.message)},
      error: (err) => {this._toastr.toastrError(err.data.message)},
    })
  }

}
