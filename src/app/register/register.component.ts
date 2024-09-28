import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,18}$/)]),
    rePassword: new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,18}$/)]),
    phone: new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  })

  onSubmit(form:FormGroup){
    console.log(form)
  }
}
