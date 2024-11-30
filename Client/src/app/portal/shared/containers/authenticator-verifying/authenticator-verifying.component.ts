import { Component } from '@angular/core';
import { AuthenticatorServiceService } from '../../../../_services/_googleauthenticator/authenticator-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-authenticator-verifying',
  standalone: true,
  imports: [FormsModule,CommonModule,TranslatePipe],
  templateUrl: './authenticator-verifying.component.html',
  styleUrl: './authenticator-verifying.component.scss'
})
export class AuthenticatorVerifyingComponent {
  userName:any;
  code: string = '';
  serverError: string | null = null;
  constructor(private _router:Router,private authenticatorService:AuthenticatorServiceService){
    this.userName=localStorage.getItem('username');
  }
  verifyCode() {
    this.serverError = null;
    debugger
    this.authenticatorService.verifyTwoFactorAuthentication(this.userName,this.code).subscribe(
      data=>{
        debugger
        localStorage.setItem('verificationdataToken',data.token);
        this._router.navigate(['/user/bexio']);
      },
      err=>{
        this.serverError = 'Invalid 2FA';
     }
    )
  }
}
