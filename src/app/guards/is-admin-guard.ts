import { CanActivateFn, Router } from '@angular/router';
import { RoleEnum, StorageKey } from '../models/Enums';
import { User } from '../models/User';
import { jwtDecode } from 'jwt-decode';
import { JwtDecoded } from '../models/Shared';
import { inject } from '@angular/core';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const jwt: string = localStorage.getItem(StorageKey.Token) || '';
  const router = inject(Router);
  console.log('Guard Admin Sebelom JWT');
  if (!jwt) {
    return false;
  }
  const decoded: JwtDecoded = jwtDecode(jwt);
  console.log('decoded=', decoded);
  if (decoded.role === RoleEnum.Admin) {
    return true;
  }
  return router.createUrlTree(['/401']);
  // return decoded.role === RoleEnum.Admin;
};
