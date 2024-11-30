import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  _url="https://localhost:7039/api/User/delete/";
  constructor(private _httpclient:HttpClient) { }
  deleteUser(id:number)
  {
    return this._httpclient.post(this._url+id,id);
  }
}
