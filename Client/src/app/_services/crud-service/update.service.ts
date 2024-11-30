import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
_url="https://localhost:7039/api/User/update"
  constructor(private _httpclient:HttpClient) { }
  updateUser(model:any)
  {
    return this._httpclient.post(this._url,model);
  }
  
}
