import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../../_services/Theme/theme.service';
import { DarkmodeserviceService } from '../../../../_services/darkmode_service/darkmodeservice.service';

@Component({
  selector: 'app-dark-mode-slider',
  standalone: true,
  imports: [MatSlideToggleModule,MatIconModule],
  templateUrl: './dark-mode-slider.component.html',
  styleUrl: './dark-mode-slider.component.scss'
})
export class DarkModeSliderComponent {
  isDarkMode: boolean;
  
  constructor(private themeService: DarkmodeserviceService) {
    this.isDarkMode = this.themeService.getDarkModePreference();
  }
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleDarkMode(this.isDarkMode);
  }
}
