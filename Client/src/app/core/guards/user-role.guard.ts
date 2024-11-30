import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetUserRoleService } from '../../_services/get-user-role/get-user-role.service';

export const userRoleGuard: CanActivateFn = (route, state) => {
  const _router=inject(Router);
  const _toastr=inject(ToastrService);
  const userRole=inject(GetUserRoleService);
  const role=userRole.getRole();
  if(role=="Admin")
    {
    return true;
  }
  else{
    _router.navigate(['/unAuthorized']);
    return false;
  }
};
