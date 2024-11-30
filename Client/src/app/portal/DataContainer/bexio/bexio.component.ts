import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { BexioserviceService } from '../../../_services/bexio-service/bexioservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'console';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';


export interface BexioTable{
  name:string;
  address:string;
  email:string;
  phoneNumber:string;
}




@Component({
  selector: 'app-bexio',
  standalone: true,
  imports: [TranslatePipe,MatTableModule,CommonModule,MatFormFieldModule,MatInputModule,MatSortModule,MatPaginatorModule],
  templateUrl: './bexio.component.html',
  styleUrl: './bexio.component.scss'
})
export class BexioComponent implements OnInit{
  displayedColumns:string[]=['name_1','address','mail','phone_mobile'];
  dataSource!: MatTableDataSource<any>;

  constructor(private _bexioService:BexioserviceService){}
@ViewChild(MatSort)sort:any;
@ViewChild(MatPaginator)paginator:any;
ngOnInit(): void {
  this._bexioService.getData().subscribe(
    (data:any[])=>{
      this.dataSource=new MatTableDataSource(data);
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    },
    error=>console.log(error.message)
  )
 
}
applyFilter(event: Event)
{
  const filterValue = (event.target as HTMLInputElement)?.value || '';
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
