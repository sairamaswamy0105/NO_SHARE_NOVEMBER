import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { VerifytokenService } from '../../../../_services/verifytoken/verifytoken.service';
import { SetpasswordService } from '../../../../_services/setpassword/setpassword.service';

@Component({
  selector: 'app-authentication-set-password',
  standalone: true,
  imports: [MatInputModule,FormsModule,CommonModule,ReactiveFormsModule,MatFormFieldModule,TranslatePipe],
  templateUrl: './authentication-set-password.component.html',
  styleUrl: './authentication-set-password.component.scss'
})
export class AuthenticationSetPasswordComponent implements OnInit {
  passwordForm:FormGroup;
  token:string|null=null;
  text:string|null=null;
  isverified:boolean| null=null;
  
  constructor(private _setpassword:SetpasswordService,private verifytoken:VerifytokenService,private _activatedroute:ActivatedRoute,private _toastr:ToastrService,private fb: FormBuilder,private _router:Router) {
    this.token = this._activatedroute.snapshot.queryParamMap.get('token');
    this.text = this._activatedroute.snapshot.queryParamMap.get('text');
    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        token:['']
      },
      {
        validator: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }
  
  ngOnInit(): void {
    const body = { "token":this.token }; 
    this.verifytoken.verify(body).subscribe(
      data=>{
        if(data)
        {
          this.isverified=true;
        }
        else{
          this.isverified=false;
        }
      } 
    )
  }
  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
    const passControl = formGroup.get(password);
    const confirmPassControl = formGroup.get(confirmPassword);

    if (confirmPassControl?.errors && !confirmPassControl.errors['mustMatch']) {
      // Return if another validator has already found an error
      return;
    }

    // Set error if passwords don't match
    if (passControl?.value !== confirmPassControl?.value) {
      confirmPassControl?.setErrors({ mustMatch: true });
    } else {
      confirmPassControl?.setErrors(null);
    }
  };
}

get f() {
  return this.passwordForm.controls;
}
onSubmit() {
  if (this.passwordForm.valid) {
    this.passwordForm.patchValue({
      token: this.token
    });
    this._setpassword.setpassword(this.passwordForm.value).subscribe(
      data=>{
        if(this.text=="update")
        this._toastr.success("Password Changed Successfully")
      else{
        this._toastr.success("Password Created Successfully")
      }
        this._router.navigate(['/'])
      }
    )
  }
}
}
