import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { Router } from '@angular/router';
import { ForgotpasswordService } from '../../../../_services/forgot_password/forgotpassword.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authentication-reset-password',
  standalone: true,
  imports: [TranslatePipe,MatButtonModule,MatInputModule,MatFormFieldModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './authentication-reset-password.component.html',
  styleUrl: './authentication-reset-password.component.scss'
})
export class AuthenticationResetPasswordComponent {
  emailForm: FormGroup;
  get f() {
    return this.emailForm.controls;
  }
    constructor(private _toastr:ToastrService,private _forgot:ForgotpasswordService,private fb: FormBuilder,private _router:Router) {
      this.emailForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });
    }
    isError:boolean=false;
  onSubmit(): void {
    if (this.emailForm.valid) {
      console.log('Form Submitted', this.emailForm.value);
      debugger
      this._forgot.sendmail(this.emailForm.value).subscribe(
        data=>{

          this._toastr.success("Email Sent Succesfully")
          this._router.navigate(['/']);
        },
        error=>this.isError=true
      )
    }
  }
  backtologin(){
    this._router.navigate(['/']);
  }
}
