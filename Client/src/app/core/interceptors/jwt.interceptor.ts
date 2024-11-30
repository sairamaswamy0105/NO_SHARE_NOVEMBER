import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginVerificationService } from '../../_services/login-service/login-verification.service';
import { catchError, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService=inject(LoginVerificationService);
  const _router=inject(Router);
  const _toastr=inject(ToastrService)
  let authReq=req;
  let token=localStorage.getItem('jwt');
if(token)
{
  authReq=req.clone({
            setHeaders:{
              Authorization:`Bearer ${token}`
            }
          })
}
  // Pass the request to the next handler and handle errors
  return next(authReq).pipe(
    catchError((error) => {
      // Handle the error based on its status or type
      if (error.status === 404) {
        // Unauthorized error (e.g., token expired or invalid)
        _toastr.error(error.error.message);
        // _router.navigate(['/']); // Redirect to login page
      } else if (error.status === 500) {
        // Internal server error
        _toastr.error('Server error. Please try again later.', 'Error');
      } 
      else if (error.status === 400) {
        // Internal server error
        _toastr.error(error.error.message);
      } 
      else if (error.status === 401) {
        // Internal server error
        _toastr.error(error.error.message);
      } 
      else {
        // General error handling
        _toastr.error('Something went wrong. Please try again.', 'Error');
      }

      // Return the error to the calling service or component
      return throwError(() => new Error(error.message || 'An error occurred'));
    })
  );
};
