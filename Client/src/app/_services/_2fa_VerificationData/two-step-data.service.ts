import { Injectable, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class TwoStepDataService {
  
  timetoken:any;
  encryptedDate: any;
  encryptedEmail: any;
  decryptedDate: any;
  decryptedEmail: any;

  constructor() { }
  GetDataFromToken(): { decryptedDate: string, decryptedEmail: string } | null
  {
    this.timetoken=localStorage.getItem('verificationdataToken');
    if(this.timetoken!=null)
    {
    const decoded: any = jwtDecode(this.timetoken);


    // Extract encrypted data from the decoded token
    this.encryptedEmail = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.encryptedDate = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    this.decryptedDate = this.decrypt(this.encryptedDate);
    this.decryptedEmail = this.decrypt(this.encryptedEmail);
    return {
      decryptedDate: this.decryptedDate,
      decryptedEmail: this.decryptedEmail
    };
    }
    return null;
  }
  
  decrypt(encryptedText: string): string {
    const key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // 32 chars
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16 chars
    const bytes = CryptoJS.AES.decrypt(encryptedText, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
