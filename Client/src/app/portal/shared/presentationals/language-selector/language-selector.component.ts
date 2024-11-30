import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { TranslationService } from '../../../../_services/translations/translation.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [MatIcon,MatMenuModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
  selectedLanguage: string|null=null;
  constructor(private cdr: ChangeDetectorRef,private translationService:TranslationService,private _toastr:ToastrService)
  {
    const savedLang = localStorage.getItem('language');
    this.selectedLanguage = savedLang === 'de-CH' ? 'German' : 'English';
  }
  setLanguage(lang: string,value:string) {
    this.selectedLanguage=value;
    localStorage.setItem('language', lang);
    this.translationService.setLanguage(lang);
    this.cdr.detectChanges(); 
  }

}
