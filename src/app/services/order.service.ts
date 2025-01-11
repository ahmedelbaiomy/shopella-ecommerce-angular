import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

   constructor(private _HttpClient: HttpClient) {}
  apiUrl: string = 'https://ecommerce.routemisr.com/api/v1';

    getLoggedUserOrders(userId:string): Observable<any> {
      return this._HttpClient.get(`${this.apiUrl}/orders/user/${userId}`);
    }
}
