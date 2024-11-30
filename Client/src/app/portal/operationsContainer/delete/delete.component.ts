import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [TranslatePipe,MatDialogModule,MatButtonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA)public data:any){}


}
