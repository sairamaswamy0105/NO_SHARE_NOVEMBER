import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; // For mat-form-field
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { SharedDataOfUserService } from '../../../_services/_shared-data/shared-data-of-user.service';
import { CreateService } from '../../../_services/crud-service/create.service';
import { UpdateService } from '../../../_services/crud-service/update.service';
import { GetuserbyidService } from '../../../_services/get-user-by-id/getuserbyid.service';
import { ActivatedRoute } from '@angular/router';
import { userModel } from '../../../core/models/user';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [MatDatepickerModule,MatNativeDateModule,TranslatePipe,MatCardModule,MatFormFieldModule,MatButtonModule,MatInputModule,FormsModule,ReactiveFormsModule,MatSelectModule,CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent{
  updateUserData: FormGroup;  // Changed to FormGroup type

constructor(
  private _toastr:ToastrService,
  private activatedRoute: ActivatedRoute,
  private _router: Router,
  private _updateService: UpdateService,
  private _fb: FormBuilder,
  private _sharedData: SharedDataOfUserService,
  private getuserbyid: GetuserbyidService,
  
) {
  // Initialize the FormGroup with empty values or validators as required
  this.updateUserData = this._fb.group({
    id:[''],
    firstName: ['',[Validators.required]],
    lastName: [''],
    pincode:['',[Validators.required]],
    street:['',[Validators.required]],
    city:['',[Validators.required]],
    mail:['',[Validators.required, Validators.email]],
    phone_Number:['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
    dateOfBirth:['',[Validators.required]],
    language:[''],
    roleId:[''],
    userImage:['']
  });

  // Fetch the user data and patch it to the form
  const userId = this.activatedRoute.snapshot.paramMap.get('id');
  this.getuserbyid.getDataById(Number(userId)).subscribe(
    data => {
      if (data) {
        this.updateUserData.patchValue(data);  // Use patchValue to populate form
      }
    },
    error => console.log(error.message)
  );
}
get f() {
  return this.updateUserData.controls;
}

     


  updateUser(updatedData:any)
  {
    this._updateService.updateUser(updatedData).subscribe(
      data=>{
        this._router.navigate(['/user/user']);
      },
      error=>this._toastr.error("Error while updating User")
    )
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        const base64String = reader.result as string;
        // Store base64 string (without the data:image/... prefix)
        this.updateUserData.patchValue({
          userImage: base64String.split(',')[1] // only the base64 content without the prefix
        });
      };

      reader.readAsDataURL(file); // Convert to base64
    }
  }

  backToUser(){
  this._router.navigate(['/user/user']);
}

}
