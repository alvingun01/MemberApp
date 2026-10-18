import { Component, inject, signal } from '@angular/core';
import { Navbar } from "../../shared/navbar/navbar";
import { Api } from '../../services/api';
import { User, UserUpdatePayload } from '../../models/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-edit-profile',
    imports: [Navbar, ɵInternalFormsSharedModule, ReactiveFormsModule],
    templateUrl: './edit-profile.html',
    styleUrl: './edit-profile.css',
})
export class EditProfile {
    private api = inject(Api);
    private users: User[] = [];
    user = signal<User | null>(null);
    editForm = new FormGroup({
        name: new FormControl<string | null>('', Validators.required),
        email: new FormControl<string | null>('', Validators.required),
        gender: new FormControl<string | null>('', Validators.required),
        dateOfBirth: new FormControl<string | null>('', Validators.required),
    });

    ngOnInit(): void {
        this.api.getUsers().subscribe({
            next: (response) => {
                this.users = response;
                if (this.users && this.users.length > 0) {
                    const currentUser = this.users[0];
                    this.user.set(currentUser);

                    this.editForm.patchValue({
                        name: currentUser.name ? String(currentUser.name) : '',
                        email: currentUser.email ? String(currentUser.email) : '',
                        gender: currentUser.gender ? String(currentUser.gender) : '',
                        dateOfBirth: currentUser.dateOfBirth ? String(currentUser.dateOfBirth) : ''
                    });

                    console.log(this.user());
                }
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
    submitForm() {
        const payload: UserUpdatePayload = {
            name: this.editForm.value.name ?? '',
            email: this.editForm.value.email ?? '',
            dateOfBirth: this.editForm.value.dateOfBirth ?? '',
            gender: this.editForm.value.gender ?? undefined,
            password: undefined
        }
        this.api.updateUserId(this.user()!.id!, payload).subscribe({
            next: (response) => {
                console.log('Update successful', response);
            },
            error: (error) => {
                console.log('Update failed', error);
            }
        })
    }
}
