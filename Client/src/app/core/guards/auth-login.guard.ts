import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GettokenService } from '../../_services/gettoken/gettoken.service';
import { ToastrService } from 'ngx-toastr';
import { GetUserRoleService } from '../../_services/get-user-role/get-user-role.service';

export const authLoginGuard: CanActivateFn = (route, state) => {
  const _router=inject(Router);
  const _toastr=inject(ToastrService);
  const userRole=inject(GetUserRoleService);
  const role=userRole.getRole();
  const allowedRoles:string[]=route.data["role"];
  if(allowedRoles.includes(role))
    {
    return true;
  }
  else{
    _router.navigate(['/']);
    return false;
  }
};
