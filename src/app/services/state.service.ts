import { Injectable, signal } from "@angular/core";
import { StorageKey } from "../models/Enums";
import { UserResponse } from "../models/User";

@Injectable({
    providedIn: 'root'
})
export class StateService {
    isLoggedIn = signal<boolean>(this.getInitialLoginStatus());

    private getInitialLoginStatus(): boolean {
        if (typeof window !== 'undefined' && window.localStorage) {
            return !!localStorage.getItem(StorageKey.User);
        }
        return false;
    }

    setLogIn(token: string, user: UserResponse) {
        localStorage.setItem(StorageKey.Token, token);
        localStorage.setItem(StorageKey.User, JSON.stringify(user));
        this.isLoggedIn.set(true);
    }
    setLogOut() {
        localStorage.removeItem(StorageKey.Token);
        localStorage.removeItem(StorageKey.User);
        this.isLoggedIn.set(false);
    }
}