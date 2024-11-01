import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }
  apiUrl:string = 'https://ecommerce.routemisr.com/api/v1';
  getProducts():Observable<any>
  {
    return this._HttpClient.get(`${this.apiUrl}/products`)
  }

  getProductDetails(id:string):Observable<any>
  {
    return this._HttpClient.get(`${this.apiUrl}/products/${id}`);
  }
}
