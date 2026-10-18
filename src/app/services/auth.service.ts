import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponse, DefaultResponse, JwtResponse } from '../models/Shared';
import { LoginPayload, LoginResponse, OtpPayload, UserRegistrationPayload } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  postLogin(body: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, body);
  }

  postRegister(body: UserRegistrationPayload): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}/register`, body);
  }

  postOtp(body: OtpPayload): Observable<DataResponse<JwtResponse>> {
    return this.http.post<DataResponse<JwtResponse>>(`${this.baseUrl}/verify-otp`, body);
  }
}
