import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User, UserResponse, UserUpdatePayload } from '../models/User';
import { RoleEnum } from '../models/Enums';
import { DataResponse } from '../models/Shared';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<UserResponse[]>(`${this.baseUrl}/users`).pipe(
      map((res) =>
        res.map((user) => ({
          id: user.id,
          name: user.name,
          dateOfBirth: new Date(user.dateOfBirth),
          email: user.email,
          gender: user.gender,
          role: user.role as RoleEnum,
          profilePicture: user.profilePicture,
        })),
      ),
    );
  }

  getUserId(id: string): Observable<User> {
    return this.http.get<DataResponse<UserResponse>>(`${this.baseUrl}/users/` + id).pipe(
      map((response) => ({
        id: response.content.id,
        name: response.content.name,
        dateOfBirth: new Date(response.content.dateOfBirth),
        email: response.content.email,
        gender: response.content.gender,
        role: response.content.role as any,
        profilePicture: response.content.profilePicture,
      })),
    );
  }
  updateUserId(id: string, payload: UserUpdatePayload): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/` + id, payload);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users`, user);
  }
}
