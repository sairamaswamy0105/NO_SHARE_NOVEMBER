import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import {  UserLoginModel } from '../../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginVerificationService {
  _url="https://localhost:7039/"
  constructor(private _httpClient:HttpClient) {

   }

   public currentUserSource=new ReplaySubject<UserLoginModel | null>(1);
   public currentUser$=this.currentUserSource.asObservable();

   loginUser(model:any)
   {
    return this._httpClient.post(this._url+"api/Home/login",model).pipe(
      map((user:any)=>{
        if(user)
          {
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
          
        }
        return user;
      })
    )
   }
}
