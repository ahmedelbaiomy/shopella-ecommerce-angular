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
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 100,
    navText: [ '', '' ],
    responsive: {
      0: {
        items: 6
      }
    },
    nav: true
  }

}
