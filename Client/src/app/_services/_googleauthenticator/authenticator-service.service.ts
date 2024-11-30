import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorServiceService {

  constructor(private http: HttpClient) {}
  // Request QR Code for 2FA setup
  setupTwoFactorAuthentication(email: string): Observable<any> {
    const data={"email":email}
    return this.http.post('https://localhost:7039/api/home/setup-2fa',data);
  }

  // Verify 2FA Code
  verifyTwoFactorAuthentication(email: string, code: string): Observable<any>{
    const data={"Email":email,"Code":code}
    return this.http.post('https://localhost:7039/api/home/verify-2fa', data);
  }
}

