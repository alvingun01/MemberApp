import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { RoleEnum, StorageKey } from '../../models/Enums';

@Component({
    selector: 'app-navbar',
    imports: [],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class Navbar {
    private router = inject(Router);
    stateService = inject(StateService);
    home() {
        this.router.navigate(['/']);
    }

    login() {
        this.router.navigate(['/login']);
        this.stateService.isLoggedIn
    }

    logout() {
        this.router.navigate(['/']);
        this.stateService.setLogOut();
    }
    dashboard() {
        const localStorageUser = localStorage.getItem(StorageKey.User) || "{}";
        const user = JSON.parse(localStorageUser);
        if (user.role == RoleEnum.Admin) {
            this.router.navigate(['/dashboard-admin']);
        }
        else {
            this.router.navigate(['/dashboard']);
        }
    }
}
