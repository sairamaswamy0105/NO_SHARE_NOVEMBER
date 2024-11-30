import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { DarkModeSliderComponent } from '../../presentationals/dark-mode-slider/dark-mode-slider.component';
import { LanguageSelectorComponent } from '../../presentationals/language-selector/language-selector.component';
import { AuthenticationLoginComponent } from "../../../authentication/containers/authentication-login/authentication-login.component";
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { LoginVerificationService } from '../../../../_services/login-service/login-verification.service';
import { TranslationService } from '../../../../_services/translations/translation.service';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';



@Component({
  selector: 'app-site-template',
  standalone: true,
  imports: [TranslatePipe,MatToolbarModule, MatSidenavModule, RouterModule, DarkModeSliderComponent, LanguageSelectorComponent,MatIconModule,MatMenuModule],
  templateUrl: './site-template.component.html',
  styleUrl: './site-template.component.scss'
})
export class SiteTemplateComponent {
  userName:string|null=null;
  router:string|null=null;
  setLanguage(lang: string) {
    localStorage.setItem('language', lang);
    this.translationService.setLanguage(lang);
  }
  constructor(private translationService:TranslationService,private loginService:LoginVerificationService,private _toastr:ToastrService,private _router:Router,@Inject(PLATFORM_ID) private platformId: Object)
  {

    
    if(isPlatformBrowser(platformId))
    {
      this.userName=localStorage.getItem('username');
    }
    this.router=_router.url.split('?')[0];
  }

  logoutUser()
  {
    this.loginService.currentUserSource.next(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    this._toastr.success("Logged out");
    this._router.navigate(['/']);
  }

}
