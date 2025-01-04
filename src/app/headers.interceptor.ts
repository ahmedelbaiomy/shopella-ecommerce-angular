import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const HeadersInterceptor: HttpInterceptorFn = (req, next) => {
  let token:any = localStorage.getItem('userToken');
  if(token){
    let request =  req.clone({
      headers:req.headers.set('token',token)
    })
   return next(request);
  }
  return next(req);
};
