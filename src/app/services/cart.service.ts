import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}
  apiUrl: string = 'https://ecommerce.routemisr.com/api/v1';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    token: `${localStorage.getItem('userToken')}`,
  });

  cartItemsCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemsCount.asObservable();
  addToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      `${this.apiUrl}/cart`,
      {
        productId: id,
      },
      {
        headers: this.headers,
      }
    ).pipe(
      tap(() => {
        this.refreshCartItemsCount();
      })
    );
  }

  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}/cart`, { headers: this.headers});
  }

  refreshCartItemsCount(){
    this.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartItemsCount.next(res.numOfCartItems);
      }
    })
  }
}
