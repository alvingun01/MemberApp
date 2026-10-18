import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegistrationPayload } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule],
    templateUrl: './register.html',
    styleUrl: './register.css',
})
export class Register {
    discount = 10;

    registerForm = new FormGroup({
        name: new FormControl(""),
        email: new FormControl("", Validators.email),
        password: new FormControl(""),
        gender: new FormControl(""),
        dateOfBirth: new FormControl("")
    });
    private authService = inject(AuthService)
    private router = inject(Router);

    register() {
        console.log("register button clicked");
        console.log(this.registerForm)
        if (this.registerForm.valid) {
            // const payload = this.registerForm.value as UserRegistrationPayload
            const payload: UserRegistrationPayload = {
                name: this.registerForm.controls.name.value ?? "",
                email: this.registerForm.controls.email.value ?? "",
                password: this.registerForm.controls.password.value ?? "",
                dateOfBirth: this.registerForm.controls.dateOfBirth.value ?? "",
                gender: this.registerForm.controls.gender.value ?? ""
            }
            this.authService.postRegister(payload).subscribe({
                next: (response) => {
                    console.log(response);
                    this.router.navigate(["/login"]);
                },
                error: (error) => {
                    console.log(error);
                }
            })

        }
        else {
            if (this.registerForm.controls.email.invalid) {
                alert('format email salah coy');
            }
            else if (this.registerForm.controls.password.invalid) {
                alert("password krg panjang");
            }
            else {
                alert("ada yang salah");
            }
        }
    }
}