import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userModel } from '../../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class GetuserbyidService {
_url='https://localhost:7039/api/User/';
  constructor(private _httpclient:HttpClient) { }
  getDataById(id:number | null):Observable<userModel>
  {
    return this._httpclient.get<userModel>(this._url+id);
  }
}
