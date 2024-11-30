import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUserRoleService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object)
  {
    
  }

  role:string |null=null;
  getRole():string
  {
    if(isPlatformBrowser(this.platformId)){

      this.role=localStorage.getItem('userRole');
    }
    return (this.role==null)?'':this.role;
  }
}
