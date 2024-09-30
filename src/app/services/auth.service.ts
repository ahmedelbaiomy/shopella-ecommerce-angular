import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient:HttpClient,private _Router:Router) {
    if(localStorage.getItem('userToken') !== null){
      this.decodeUserToken();
    }
  }
  apiUrl:string = 'https://ecommerce.routemisr.com/api/v1';
  userData = new BehaviorSubject(null);
  register(userData:IUser):Observable<any>
  {
    return this._httpClient.post(`${this.apiUrl}/auth/signup`,userData);
  }

  login(userData:{email:string,password:string}):Observable<any>
  {
    return this._httpClient.post(`${this.apiUrl}/auth/signin`,userData);
  }

  decodeUserToken(){
    let encodedToken = localStorage.getItem('userToken')
    if(encodedToken){
      let decodedToken:any =JSON.stringify(jwtDecode(encodedToken));
      this.userData.next(decodedToken)
    }
  }
  logout(): void {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
}
