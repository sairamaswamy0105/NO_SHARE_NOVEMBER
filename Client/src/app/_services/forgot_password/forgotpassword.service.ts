import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {
_url='https://localhost:7039/';
  constructor(private _httpclient:HttpClient) { 

  }
  sendmail(data:any)
  {
    return this._httpclient.post(this._url+"api/Home/forgot",data);
  }
}
