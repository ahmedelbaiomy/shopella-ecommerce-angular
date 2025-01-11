import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrl: './categories-banner.component.scss'
})

export class CategoriesBannerComponent implements OnInit {
  categories:any[]=[];
  constructor(private _ProductsService:ProductsService) { }
  ngOnInit(): void {
    this._ProductsService.getCategories().subscribe({
      next: (res) =>{
        this.categories=res.data;
      },
    })

  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3 // Small screens: Show 3 items
      },
      768: {
        items: 4 // Medium screens: Show 4 items
      },
      1024: {
        items: 6 // Large screens: Show 6 items
      }
    },
    nav: true
  };


}
