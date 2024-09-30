import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient:HttpClient) { }

  register(userData:IUser):Observable<any>
  {
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',userData);
  }
}
