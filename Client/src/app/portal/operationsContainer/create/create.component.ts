import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; // For mat-form-field
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { CreateService } from '../../../_services/crud-service/create.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatNativeDateModule,MatDatepickerModule,TranslatePipe,CommonModule,FormsModule,MatCardModule,MatFormFieldModule,MatButtonModule,MatInputModule,ReactiveFormsModule,MatSelectModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  createdUser=new FormGroup({
    firstName:new FormControl<string | null>('',[Validators.required]),
    lastName:new FormControl<string | null>(''),
    pincode:new FormControl<string | null>('',[Validators.required]),
    street:new FormControl<string | null>('',[Validators.required]),
    city:new FormControl<string | null>('',[Validators.required]),
    mail:new FormControl<string | null>('',[Validators.required, Validators.email]),
    phone_Number: new FormControl<string | null>('',[Validators.required,Validators.pattern('^[0-9]{10}$')]),
    dateOfBirth:new FormControl<string | null>('',[Validators.required]),
    roleId:new FormControl<string | null>("2",[Validators.required]),
    language:new FormControl<string | null>('de-CH',[Validators.required]),
    userImage: new FormControl<string | null>(null)
  });
  get f() {
    return this.createdUser.controls;
  }
  constructor(private _toastr:ToastrService,private _router :Router,private _createService:CreateService,private _fb:FormBuilder){}
  backToUser(){
    this._router.navigate(['/user/user']);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        const base64String = reader.result as string;
        // Store base64 string (without the data:image/... prefix)
        this.createdUser.patchValue({
          userImage: base64String.split(',')[1] // only the base64 content without the prefix
        });
      };

      reader.readAsDataURL(file); // Convert to base64
    }
  }

  
  createNewUser(createdData:any)
  {
    this._createService.createUser(createdData).subscribe(
      data=>{
        // console.log(data);
        this._toastr.success("Created successfully"),
        this._router.navigate(['/user/user']);
      },
      error => {
        this._toastr.error(error),
        // Display error message to the user
        alert(error); // Show the error message (e.g., "User with this email already exists.")
      }
    )
  }
}
