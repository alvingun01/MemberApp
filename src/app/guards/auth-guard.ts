import { CanActivateFn } from '@angular/router';
import { StorageKey } from '../models/Enums';

//TODO: change to use jwt when jwt is implemented
export const authGuard: CanActivateFn = (route, state) => {
  return !!localStorage.getItem(StorageKey.Token);
};
