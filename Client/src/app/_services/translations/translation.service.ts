import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: Record<string, string> = {};
  public isLoaded = new BehaviorSubject<boolean>(false);
  private currentLanguage: string = 'en-US';

  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {
    if(isPlatformBrowser(this.platformId)){
      this.currentLanguage = localStorage.getItem('language') || 'en-US'; 
      this.loadTranslations();
    }
}

  setLanguage(lang: string) {
    this.currentLanguage = lang;
    localStorage.setItem('language', lang); // Save language to local storage
    this.loadTranslations();
  }

  private loadTranslations() {
    this.isLoaded.next(false); 
    const path = `Translations/translations.xlsx`;
    this.http.get(path, { responseType: 'arraybuffer' }).subscribe((data) => {
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Parse the sheet into a translations object
      this.translations = {};
      sheet.forEach((row: any) => {
        if (row['Key'] && row[this.currentLanguage]) {
          this.translations[row['Key']] = row[this.currentLanguage];
        }
      });
      this.isLoaded.next(true);
    });
  }

  getTranslation(key: string): string {
    return this.translations[key] || key;
  }
}
