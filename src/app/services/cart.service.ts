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
      }
    ).pipe(
      tap(() => {
        this.refreshCartItemsCount();
      })
    );
  }

  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}/cart`);
  }

  removeCartItem(id:string): Observable<any> {
    return this._HttpClient.delete(`${this.apiUrl}/cart/${id}`);
  }

  updateCartItemQuantity(id:string,count:number): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}/cart/${id}`,{count:count});
  }

  refreshCartItemsCount(){
    this.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartItemsCount.next(res.numOfCartItems);
      }
    })
  }

  onlinePayment(shippingAddress:any,cartId:string): Observable<any>{
    return this._HttpClient.post(`${this.apiUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200`,
    {shippingAddress:shippingAddress}
    );
  }
}
