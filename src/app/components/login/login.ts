import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  ViewChild,
  viewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginPayload, LoginResponse, User } from '../../models/User';
import { Router } from '@angular/router';
import { Otp } from '../otp/otp';
import { StateService } from '../../services/state.service';
import { RoleEnum, StatusCode, StorageKey } from '../../models/Enums';
import { DataResponse, DefaultResponse, JwtResponse } from '../../models/Shared';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Otp],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @ViewChild('otp') otpPopup!: Otp;
  private authService = inject(AuthService);
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private stateService = inject(StateService);
  private loaderService = inject(LoaderService);

  login() {
    console.log('login button clicked');
    const payload: LoginPayload = this.loginForm.value as LoginPayload;
    this.loaderService.showLoader();
    this.authService.postLogin(payload).subscribe({
      next: (response: LoginResponse) => {
        // this.stateService.setLogIn(response.token, response.user);
        console.log('login response ', response);
        if (response.status_code === StatusCode.Success) {
          this.otpPopup.showPopUp();
          this.cdr.detectChanges();
        } else {
          alert(response.status_message);
        }
        this.loaderService.hideLoader();
      },
      error: (error) => {
        this.loaderService.hideLoader();
        console.log(error);
        //TODO: show toast
      },
    });
  }
  onOtpSubmitted(otp: string) {
    this.authService.postOtp({ otp: otp, email: this.loginForm.controls.email.value }).subscribe({
      next: (response: DataResponse<JwtResponse>) => {
        console.log('Post Otp', response);
        console.log('atas', response.status_code === StatusCode.Success);
        if (response.status_code === StatusCode.Success) {
          console.log('bawah', response.status_code === StatusCode.Success);
          this.otpPopup.hidePopUp();
          localStorage.setItem(StorageKey.User, 'user');
          localStorage.setItem(StorageKey.Token, response.content.token);
          this.cdr.detectChanges();
          this.router.navigate(['/dashboard']);
        } else {
          alert('OTP not match');
        }
      },
      error: (error) => {
        console.log(error);
        //TODO: show toast
      },
    });
  }
}
