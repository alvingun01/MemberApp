import { Component, inject, input } from '@angular/core';
import { Navbar } from "../../shared/navbar/navbar";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Api } from '../../services/api';
import { User, UserUpdatePayload } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile-admin',
  imports: [Navbar, ReactiveFormsModule],
  templateUrl: './edit-profile-admin.html',
  styleUrl: './edit-profile-admin.css',
})
export class EditProfileAdmin {

  private api = inject(Api);
  private router = inject(Router);
  id = input.required<string>();
  editForm = new FormGroup({
    name: new FormControl<string>(""),
    email: new FormControl<string>(""),
    gender: new FormControl<string>(""),
    password: new FormControl<string>(""),
    dateOfBirth: new FormControl<string>(""),
  })

  ngOnInit(): void {
    this.api.getUserId(this.id()).subscribe({
      next: (user) => {
        this.editForm.patchValue({
          name: user.name ? String(user.name) : '',
          email: user.email ? String(user.email) : '',
          gender: user.gender ? String(user.gender) : '',
          dateOfBirth: user.dateOfBirth ? user.dateOfBirth.toISOString().substring(0, 10) : ''
        });
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
      password: this.editForm.value.password ?? undefined
    };

    this.api.updateUserId(this.id(), payload).subscribe({
      next: (response) => {
        console.log('Update successful', response);
        this.router.navigate(['/dashboard-admin']);
      },
      error: (error) => {
        console.log('Update failed', error);
      }
    });
  }
}
