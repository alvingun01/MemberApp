import { DataResponse, DefaultResponse } from './Shared';
import { RoleEnum } from './Enums';

export interface User {
  id?: string;
  name: String;
  dateOfBirth: Date;
  email: String;
  password?: String;
  gender?: String;
  role?: RoleEnum;
  profilePicture?: String;
}

export interface UserRegistrationPayload {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: string;
}

export interface UserUpdatePayload {
  name: string;
  dateOfBirth: string;
  email: string;
  gender?: string;
  password?: string;
}

export interface OtpPayload {
  email: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserResponse {
  id?: string;
  name: string;
  dateOfBirth: string;
  email: string;
  gender?: string;
  role?: string;
  profilePicture?: string;
}

export interface LoginResponse extends DataResponse<User> {}
