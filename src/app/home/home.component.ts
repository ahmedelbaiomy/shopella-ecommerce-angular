import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  products: any[]=[];
  isLoading:boolean = false;
  constructor(private _ProductsService:ProductsService) { }
  ngOnInit(): void {
    this.isLoading = true;
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.isLoading = false;
      },
    })
  }
}
