import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit{
  order!:any;
  isLoading: boolean = false;
  constructor(){
  }

  ngOnInit(): void {
    this.order = history.state.order;
  }


}
