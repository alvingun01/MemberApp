import { Component } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  imports: [],
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class PopUp {
  isOpen: boolean = false;
  showPopUp() {
    this.isOpen = true;
  }
  hidePopUp() {
    console.log('atas hide popup');
    this.isOpen = false;
    console.log('bawah hide popup');
  }
  onClose() {
    this.isOpen = false;
  }
}
