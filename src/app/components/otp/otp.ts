import { Component, EventEmitter, inject, Output, output, ViewChild } from '@angular/core';
import { PopUp } from '../../shared/popup/popup';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleEnum } from '../../models/Enums';

@Component({
  selector: 'app-otp',
  imports: [PopUp, ReactiveFormsModule],
  templateUrl: './otp.html',
  styleUrl: './otp.css',
})
export class Otp {
  private router = inject(Router);
  @ViewChild('popUp') popUp!: PopUp;
  @Output() otpSubmitted = new EventEmitter<string>();
  otpForm = new FormGroup({
    otp: new FormControl(''),
  });
  showPopUp() {
    this.popUp.showPopUp();
  }
  hidePopUp() {
    this.popUp.hidePopUp();
    console.log('ini popup');
  }
  submitOTP() {
    console.log('button clicked');
    this.otpSubmitted.emit(this.otpForm.value?.otp ?? '');
  }
}
