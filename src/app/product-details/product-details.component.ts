import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Params } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService
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
}
