import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BexioserviceService {
_url="https://localhost:7039/api/Bexio/BexioData";
  constructor(private _httpclient:HttpClient) { }
  getData():Observable<any[]>
  {
    return this._httpclient.get<any[]>(this._url);
  }
}
