import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  isLoggedIn:boolean = false;
 constructor(private _authService:AuthService){
  _authService.userData.subscribe({
    next: () => {
      if(_authService.userData.getValue() !== null){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    }
  })
 }

 ngOnInit(){
  this._authService.userData
 }

 onLogout(){
  this._authService.logout();
 }
}
