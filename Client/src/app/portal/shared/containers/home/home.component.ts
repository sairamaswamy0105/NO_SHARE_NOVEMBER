import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSidenavModule,MatListModule,CommonModule,RouterOutlet,MatButtonModule,MatIconModule,TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  userRole:string|null=null;
  constructor(private _router:Router)
  {
    this.userRole=localStorage.getItem('userRole');
  }
  listItems: string[] = ['Bexio', 'User'];
  NavigateToPage(item:string){
    if(item==='Bexio')
    {
      // console.log("HEllo");
      this._router.navigate(['/user/bexio']);
    }
    if(item==='User')
      {
        // console.log("HEllo");
        this._router.navigate(['/user/user']);
      }
  }
}
