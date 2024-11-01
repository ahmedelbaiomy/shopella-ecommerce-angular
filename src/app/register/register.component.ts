import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private _authService:AuthService,private _Router:Router,private _toastr:ToasterService){
    if(localStorage.getItem('userToken') !== null){
      this._Router.navigate(['/home']);
    }
  }
  isLoading:boolean=false;
  registerForm:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,18}$/)]),
    rePassword: new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,18}$/)]),
    phone: new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  })

  onSubmit(form:FormGroup){
    if(form.valid){
      this.isLoading=true;
      this._authService.register(form.value).subscribe({
        next: (res) => {
          if(res.message === 'success'){
            this.isLoading = false;
            this._toastr.toastrSuccess(res.message)
            this._Router.navigate(['/login'])
          }
        },
        error:(err)=>{
          this.isLoading = false;
          this._toastr.toastrError(err.error.message)
        }
      })
    }
  }
}
