import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetpasswordService {
_url='https://localhost:7039/api/Home/setpassword';
  constructor(private _httpclient:HttpClient) { }
  setpassword(model:any)
  {
    return this._httpclient.post(this._url,model);
  }
}
