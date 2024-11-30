import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GettokenService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object)
  {
    
  }

  token:string |null=null;
  getToken()
  {
    if(isPlatformBrowser(this.platformId)){

      this.token=localStorage.getItem('jwt');
    }
    return this.token;
  }
}
