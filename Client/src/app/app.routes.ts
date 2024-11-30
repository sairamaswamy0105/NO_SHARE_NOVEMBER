import { Routes } from '@angular/router';
import { UnauthorizedComponent } from './shared/presentationals/unauthorized/unauthorized.component';
import { AuthenticationResetPasswordComponent } from './portal/authentication/containers/authentication-reset-password/authentication-reset-password.component';
import { AuthenticationSetPasswordComponent } from './portal/authentication/containers/authentication-set-password/authentication-set-password.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./portal/portal.routes').then(m => m.portalRoutes)
  },
  {
    path:'unAuthorized',
    component:UnauthorizedComponent
  }
];
