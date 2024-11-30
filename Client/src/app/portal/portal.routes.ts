import { Routes } from '@angular/router';
import { SiteTemplateComponent } from './shared/containers/site-template/site-template.component';
import { HomeComponent } from './shared/containers/home/home.component';
import { BexioComponent } from './DataContainer/bexio/bexio.component';
import { UserComponent } from './DataContainer/user/user.component';
import { UpdateComponent } from './operationsContainer/update/update.component';
import { DeleteComponent } from './operationsContainer/delete/delete.component';
import { CreateComponent } from './operationsContainer/create/create.component';
import { authLoginGuard } from '../core/guards/auth-login.guard';
import { AuthenticationLoginComponent } from './authentication/containers/authentication-login/authentication-login.component';
import { userRoleGuard } from '../core/guards/user-role.guard';
import { AuthenticationResetPasswordComponent } from './authentication/containers/authentication-reset-password/authentication-reset-password.component';
import { AuthenticationSetPasswordComponent } from './authentication/containers/authentication-set-password/authentication-set-password.component';
import { AuthenticatorScannerPageComponent } from './shared/containers/authenticator-scanner-page/authenticator-scanner-page.component';
import { AuthenticatorVerifyingComponent } from './shared/containers/authenticator-verifying/authenticator-verifying.component';


export const portalRoutes: Routes = [
  {
    path: '',
    component: SiteTemplateComponent,
    pathMatch:"full",
    children: [
    {
      path: '',
    component: AuthenticationLoginComponent
    }]
  },
  {
    path:'forgot',
    component:SiteTemplateComponent,
    children:[
      {
        path:'password',
        component:AuthenticationResetPasswordComponent
      }
    ]
  },{
    path:'auth',
    component:SiteTemplateComponent,
    children:[
      {
        path:'2faauth',
        component:AuthenticatorScannerPageComponent
      },{
        path:'verifier',
        component:AuthenticatorVerifyingComponent
      }
    ]
  },
  {
    path:'set',
    component:SiteTemplateComponent,
    children:[
      {
        path:'password',
        component:AuthenticationSetPasswordComponent
      }
    ]
  },
  {
    path: 'user',
    component: SiteTemplateComponent,
    canActivate:[authLoginGuard],
    data:{"role":["Admin","User"]},
    children: [
      { path: '', component: HomeComponent, 
        children: [   // Home route with nested children
        { path: 'bexio', component: BexioComponent,data:{"role":["Admin","User"]} ,canActivate:[authLoginGuard]},         // Bexio route
        { path: 'user', component: UserComponent ,data:{"role":["Admin"]},canActivate:[authLoginGuard]},           // User route
        {path:'update/:id',component:UpdateComponent},
        {path:'delete',component:DeleteComponent},
        {path:'create',component:CreateComponent},
        { path: '', redirectTo: 'bexio', pathMatch: 'full' }  // Default to Bexio,
      ]}]
  }
  
  
];

