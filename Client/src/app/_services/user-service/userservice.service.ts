import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
_url='https://localhost:7039/api/User/userdata';
  constructor(private _httpclient:HttpClient) { }
  getUserData():Observable<any[]>
  {
    return this._httpclient.get<any[]>(this._url);
  }
}
