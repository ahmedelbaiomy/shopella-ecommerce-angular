import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private _toastr:ToastrService) { }

  toastrSuccess(msg:string){
    this._toastr.success(msg,'Success',{
      timeOut: 5000,
      closeButton:true,
      progressBar:true
    })
  }

  toastrError(msg:string){
    this._toastr.error(msg,'Error',{
      timeOut: 5000,
      closeButton:true,
      progressBar:true
    })
  }
}
