import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DarkmodeserviceService {
  private readonly DARK_MODE_CLASS = 'dark-mode';
  private readonly DARK_MODE_KEY = 'isDarkMode';
 
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const isDarkMode = this.getDarkModePreference();
      this.setDarkMode(isDarkMode);
    }
  }
 
  toggleDarkMode(isDarkMode: boolean): void {
    this.setDarkMode(isDarkMode);
    this.saveDarkModePreference(isDarkMode);
  }
 
  private setDarkMode(isDarkMode: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle(this.DARK_MODE_CLASS, isDarkMode);
    }
  }
 
  private saveDarkModePreference(isDarkMode: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.DARK_MODE_KEY, JSON.stringify(isDarkMode));
    }
  }
 
  getDarkModePreference(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const savedPreference = localStorage.getItem(this.DARK_MODE_KEY);
      return savedPreference ? JSON.parse(savedPreference) : false;
    }
    return false;
  }
}
