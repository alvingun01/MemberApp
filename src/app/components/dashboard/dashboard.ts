import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Api } from '../../services/api';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { StorageKey } from '../../models/Enums';
import { jwtDecode } from 'jwt-decode';
import { JwtDecoded } from '../../models/Shared';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private api = inject(Api);
  private users: User = {
    name: '',
    dateOfBirth: new Date(),
    email: '',
  };
  private router = inject(Router);
  user = signal<User | null>(null);

  ngOnInit(): void {
    const jwt = jwtDecode<JwtDecoded>(localStorage.getItem(StorageKey.Token) || '');
    this.api.getUserId(jwt.sub).subscribe({
      next: (response) => {
        this.users = response;
        if (this.users) {
          this.user.set(this.users);
          console.log(this.user());
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handleEdit() {
    this.router.navigate(['/edit-profile']);
  }
}
