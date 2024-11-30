import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserserviceService } from '../../../_services/user-service/userservice.service';
import { Router } from '@angular/router';
import { SharedDataOfUserService } from '../../../_services/_shared-data/shared-data-of-user.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteComponent } from '../../operationsContainer/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteService } from '../../../_services/crud-service/delete.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

export interface BexioTable {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    TranslatePipe,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent{
  displayedColumns: string[] = ['firstName', 'street', 'mail', 'phone_Number', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: any;  // MatSort can be undefined, handle that below
  @ViewChild(MatPaginator)paginator:any;

  constructor(
    private _deletedService: DeleteService,
    private _dialog: MatDialog,
    private _userService: UserserviceService,
    private _router: Router,
    private _sharedData: SharedDataOfUserService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._userService.getUserData().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      },
      (error) => console.log(error.message)
    );
  }


  editUser(element: any) {
    const userId = element.id;
    this._router.navigate(['user/update', userId]);
  }

  openSnackBar(name: string, id: number) {
    let dialogRef = this._dialog.open(DeleteComponent, { data: { name: name } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'false') {
        this._deletedService.deleteUser(id).subscribe(
          (data) => {
            console.log(data);
            this._router.navigate(['/user/user']).then(() => {
              window.location.reload();
            });
          },
          (error) => console.log(error.message)
        );
      }
    });
  }

  createUser() {
    this._router.navigate(['user/create']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement)?.value || '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
