import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Params } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToasterService } from '../services/toastr.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService:CartService,    private _toastr: ToasterService
  ) {}
  isLoading:boolean = false;
  productId!: string;
  product!: any;
  itemCount:number = 1;
  ngOnInit(): void {
    this.isLoading = true;
    this._ActivatedRoute.params.subscribe((params: Params) => {
      this.productId = params['id'];
    });

    this._ProductsService.getProductDetails(this.productId).subscribe({
      next: (res) => {
        this.product = res.data;
        this.isLoading = false;
        console.log(this.product)
      },
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [ '', '' ],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  AddToCart(id:string){
    this._CartService.addToCart(id).subscribe({
      next: (res) => {this._toastr.toastrSuccess(res.data.message)},
      error: (err) => {this._toastr.toastrError(err.data.message)},
    })
  }
}
