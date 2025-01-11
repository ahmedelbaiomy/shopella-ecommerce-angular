import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'] // Corrected to `styleUrls`
})
export class OrdersComponent implements OnInit {
  isLoading: boolean = false;
  orders: any[] = [];
  sortedOrders: any[] = []; // New array to hold sorted orders
  userId: string = '';

  constructor(
    private _authService: AuthService,
    private _OrderService: OrderService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.onGetOrders();
  }

  onGetOrders() {
    this.userId = this._authService.userId ?? '';
    this.isLoading = true;

    this._OrderService.getLoggedUserOrders(this.userId).subscribe({
      next: (res) => {
        this.orders = res;
        this.sortedOrders = this.orders.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.isLoading = false;
      }
    });
  }

  viewOrderDetails(order:any){
    this._router.navigate(['/order-details'], { state: { order } });
  }
}
