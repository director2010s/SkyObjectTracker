import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';

interface CustomClaims {
  admin?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private isAdminSubject = new BehaviorSubject<boolean>(false);

  user$ = this.userSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    this.auth.onAuthStateChanged(async (user) => {
      this.userSubject.next(user);
      
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          const claims = idTokenResult.claims as CustomClaims;
          this.isAdminSubject.next(!!claims.admin);
        } catch (error) {
          console.error('Error checking admin status:', error);
          this.isAdminSubject.next(false);
        }
      } else {
        this.isAdminSubject.next(false);
      }
    });
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        tap(() => {
          this.router.navigate(['/']);
        })
      );
  }

  register(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        tap(() => {
          this.router.navigate(['/']);
        })
      );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth))
      .pipe(
        tap(() => {
          this.router.navigate(['/login']);
        })
      );
  }

  isAuthenticated(): boolean {
    return !!this.auth.currentUser;
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  isAdmin(): boolean {
    return this.isAdminSubject.value;
  }
}