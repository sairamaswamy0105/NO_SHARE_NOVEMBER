import { Component } from '@angular/core';
import { AuthenticationLoginComponent } from '../../../authentication/containers/authentication-login/authentication-login.component';
import { ScannerDetailsService } from '../../../../_services/_scannerdetails/scanner-details.service';
import { FormsModule } from '@angular/forms';
import { AuthenticatorServiceService } from '../../../../_services/_googleauthenticator/authenticator-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-authenticator-scanner-page',
  standalone: true,
  imports: [TranslatePipe,FormsModule,CommonModule],
  templateUrl: './authenticator-scanner-page.component.html',
  styleUrl: './authenticator-scanner-page.component.scss'
})
export class AuthenticatorScannerPageComponent {
  data1:any;
  data2:any;
  userName:any;
  serverError: string | null = null;
constructor(private _router:Router,private authenticatorService:AuthenticatorServiceService,private _scannerdetailsservice:ScannerDetailsService)
{
  debugger
  _scannerdetailsservice.getData.subscribe(value=>{
    this.data1=value.data1,
    this.data2=value.data2
  })
  this.userName=localStorage.getItem('username');
}

code: string = ''; // This variable will hold the value of the input field
  verifyCode() {
    this.serverError = null;
    this.authenticatorService.verifyTwoFactorAuthentication(this.userName,this.code).subscribe(
      data=>{
        debugger
        localStorage.setItem('verificationdataToken',data.token);
        // data.encryptedDate;
          // data.encryptedEmail;
        this._router.navigate(['/user/bexio']);
      },
      err=>{
        this.serverError="Invalid 2FA";
      }
    )
  }


}
