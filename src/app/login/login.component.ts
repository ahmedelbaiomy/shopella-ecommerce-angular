import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private _authService: AuthService,
    private _Router: Router,
    private _toastr: ToasterService
  ) {

    if(localStorage.getItem('userToken') !== null){
      this._Router.navigate(['/home']);
    }
  }

  isLoading: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,18}$/),
    ]),
  });

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.isLoading = true;
      this._authService.login(form.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.isLoading = false;
            this._toastr.toastrSuccess(res.message);
            localStorage.setItem('userToken',res.token);
            this._authService.decodeUserToken()
            this._Router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this._toastr.toastrError(err.error.message);
        },
      });
    }
  }
}
