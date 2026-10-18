import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Home } from './components/home/home';
import { EditProfile } from './components/edit-profile/edit-profile';
import { DashboardAdmin } from './components/dashboard-admin/dashboard-admin';
import { EditProfileAdmin } from './components/edit-profile-admin/edit-profile-admin';
import { authGuard } from './guards/auth-guard';
import { isAdminGuard } from './guards/is-admin-guard';
import { NotFoundError } from './components/not-found-error/not-found-error';
import { Unauthorised } from './components/unauthorised/unauthorised';

export const routes: Routes = [
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'edit-profile',
    component: EditProfile,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard-admin',
    component: DashboardAdmin,
    canActivate: [authGuard, isAdminGuard],
  },
  {
    path: 'edit-profile-admin/:id',
    component: EditProfileAdmin,
    canActivate: [authGuard, isAdminGuard],
  },
  {
    path: '',
    component: Home,
  },
  {
    path: '404',
    component: NotFoundError,
  },
  {
    path: '401',
    component: Unauthorised,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
