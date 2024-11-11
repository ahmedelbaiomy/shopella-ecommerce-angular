import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() product:any;
  @Output() addToCart= new EventEmitter<string>();

  onAddToCart(){
    this.addToCart.emit(this.product._id);
  }
}
