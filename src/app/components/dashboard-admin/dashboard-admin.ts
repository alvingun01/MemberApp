import { Component, inject, signal } from '@angular/core';
import { User } from '../../models/User';
import { Api } from '../../services/api';
import { Router } from '@angular/router';
import { Navbar } from "../../shared/navbar/navbar";

@Component({
  selector: 'app-dashboard-admin',
  imports: [Navbar],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css',
})
export class DashboardAdmin {
  private api = inject(Api)
  users = signal<User[]>([])
  private router = inject(Router)

  ngOnInit(): void {
    this.api.getUsers().subscribe({
      next: (response) => {
        this.users.set(response);
        console.log(this.users());
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  handleEdit(id?: string) {
    if (id) {
      this.router.navigate(["/edit-profile-admin/" + id]);
    }
  }
}
