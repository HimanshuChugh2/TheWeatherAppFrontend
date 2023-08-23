import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorCodeSubject = new BehaviorSubject<string | null>(null);
  private errorMessageSubject = new BehaviorSubject<string | null>(null);

  errorCode$ = this.errorCodeSubject.asObservable();
  errorMessage$ = this.errorMessageSubject.asObservable();

  setError(errorCode: string, errorMessage: string) {
    this.errorCodeSubject.next(errorCode);
    this.errorMessageSubject.next(errorMessage);
  }
// when the api returns successful response, we set the error variables to null so that it clears previously shown errors from the screen
  clearError() {
    this.errorCodeSubject.next(null);
    this.errorMessageSubject.next(null);
  }
}
