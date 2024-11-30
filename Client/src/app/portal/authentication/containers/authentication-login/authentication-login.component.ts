import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; // For mat-form-field
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginVerificationService } from '../../../../_services/login-service/login-verification.service';
import { jwtDecode } from 'jwt-decode';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { AuthenticatorServiceService } from '../../../../_services/_googleauthenticator/authenticator-service.service';
import { ScannerDetailsService } from '../../../../_services/_scannerdetails/scanner-details.service';
import { TranslationService } from '../../../../_services/translations/translation.service';
import { TwoStepDataService } from '../../../../_services/_2fa_VerificationData/two-step-data.service';






@Component({
  selector: 'app-authentication-login',
  standalone: true,
  imports: [TranslatePipe, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './authentication-login.component.html',
  styleUrl: './authentication-login.component.scss'
})
export class AuthenticationLoginComponent implements OnInit {
  ngOnInit(): void {
    this.getCurrentUser();
  }
  currentUser: string | null = null;
  getCurrentUser() {
    this._loginVerificationService.currentUser$.subscribe(
      user => {
        this.loggedIn = !!user;
        this.currentUser = (!!user) ? user.userName : null;

      }
    )
  }
  loginForm: any;
  loggedIn = false;
  token: string | null = null;
  email: string | null = null;
  constructor(private _twostepdataservice:TwoStepDataService,private cdr: ChangeDetectorRef,private translationService:TranslationService,private _scannerdetailsservice: ScannerDetailsService, private _authenticator: AuthenticatorServiceService, private _formBuilder: FormBuilder, private _loginVerificationService: LoginVerificationService, private _router: Router, private _toastr: ToastrService, @Inject(PLATFORM_ID) private platformId: Object) {
       this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  };
  get f() {
    return this.loginForm.controls;
  }
  forgotpage() {
    this._router.navigate(['/forgot/password']);
  }
  languageName:any;
  verifyUserDetailsAfterLoggedIn() {
    console.log(this.loginForm.value);
    this._loginVerificationService.loginUser(this.loginForm.value).subscribe(
      data => {
        this.loggedIn = true;
        localStorage.setItem('language',data.language);
        (data.language=="de-CH")?this.languageName="German":this.languageName="English";
        this.setLanguage(data.language,this.languageName);
        localStorage.setItem('jwt', data.token);
        localStorage.setItem('username', data.userName);
        this.email = data.userName;
        localStorage.setItem('userRole', this.getRoleFromToken(data.token));
        this._toastr.success("Logged in Successfully");
        if(data.qrCode!="" && data.secretKey!="")
        {
          // this._scannerdetailsservice.message.next({ data1: data.qrCode, data2: data.secretKey });
          this._scannerdetailsservice.updateMessage(data.qrCode,data.secretKey);
          this._router.navigate(['/auth/2faauth']);
          return;
        }
        const loggedInUser=localStorage.getItem('username');
          const AfterDecryptedData=this._twostepdataservice.GetDataFromToken();
          console.log(AfterDecryptedData?.decryptedDate);
          console.log(AfterDecryptedData?.decryptedEmail);
          if(AfterDecryptedData==null)
          {
            this._router.navigate(['/auth/verifier']);
            return;
          }
          const givenTime = new Date((AfterDecryptedData?.decryptedDate!=null)?AfterDecryptedData.decryptedDate:""); // Your given time
          const currentTime = new Date(); // Current time
          // Calculate the difference in milliseconds
          const diffMilliseconds = currentTime.getTime() - givenTime.getTime();
          // Convert the difference to hours
          const diffHours = diffMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
          // Check if the difference is greater or less than 24 hours
          if (AfterDecryptedData!=null && AfterDecryptedData?.decryptedEmail==loggedInUser && Math.abs(diffHours) < 24) {
            this._router.navigate(['/user/bexio']);
            return;
          } 
          else {
            this._router.navigate(['/auth/verifier']);
            return;
          }

      },
      error => {
        this._router.navigate(['/']);
      }
    )
  }
  selectedLanguage: string|null=null;//Sathvika is a good girl;
  setLanguage(lang: string,value:string) {
    this.selectedLanguage=value;
    localStorage.setItem('language', lang);
    this.translationService.setLanguage(lang);
    this.cdr.detectChanges(); 
  }



  getRoleFromToken(token: string): string {
    try {
      // Decode the JWT token
      const decoded: any = jwtDecode(token);

      // Assuming the role is stored in the 'role' field of the JWT payload
      return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    } catch (error) {
      console.error("Invalid token:", error);
      return "";
    }
  }


}


