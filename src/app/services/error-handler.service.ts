import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ErrorState {
  message: string;
  code?: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private errorSubject = new BehaviorSubject<ErrorState | null>(null);
  error$ = this.errorSubject.asObservable();

  handleError(error: any): void {
    console.error('Application error:', error);
    
    const errorState: ErrorState = {
      message: this.getErrorMessage(error),
      code: error.code,
      timestamp: new Date()
    };

    this.errorSubject.next(errorState);
  }

  clearError(): void {
    this.errorSubject.next(null);
  }

  private getErrorMessage(error: any): string {
    if (typeof error === 'string') {
      return error;
    }
    
    if (error.message) {
      return error.message;
    }

    return 'An unexpected error occurred. Please try again.';
  }
}