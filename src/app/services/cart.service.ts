import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }
  apiUrl:string = 'https://ecommerce.routemisr.com/api/v1';
  private headers= new HttpHeaders({
    'Content-Type': 'application/json',
    token: `${localStorage.getItem('userToken')}`
  })


  addToCart(id:string):Observable<any>
  {
    return this._HttpClient.post(`${this.apiUrl}/cart`,
      {
        "productId":id
      },{
        headers: this.headers
      }
    );
  }
}
