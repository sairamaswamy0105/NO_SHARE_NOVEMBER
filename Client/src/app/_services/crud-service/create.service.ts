import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  _url="https://localhost:7039/api/User/create";
  constructor(private _httpclient:HttpClient) { }
  createUser(model:any)
  {
    return this._httpclient.post(this._url, model).pipe(
      catchError((error) => {
        // Check if the error is from a BadRequest (status 400)
        if (error.status === 400 && error.error.message === "User with this email already exists.") {
          return throwError('User with this email already exists.');
        }
        return throwError('An error occurred while creating the user.');
      })
    );
  }
}
