import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideToastr( {positionClass: 'toast-bottom-right'}),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),provideAnimationsAsync(),provideHttpClient(withInterceptors([jwtInterceptor])), provideAnimationsAsync()]
};
