import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _isLoading = signal(false);
  public isLoading = this._isLoading.asReadonly();

  showLoader() {
    this._isLoading.set(true);
  }

  hideLoader() {
    this._isLoading.set(false);
  }
}
