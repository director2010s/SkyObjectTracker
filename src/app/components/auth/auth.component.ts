import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoginFormComponent,
    RegisterFormComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ isLogin ? 'Sign in to your account' : 'Create a new account' }}
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <app-login-form *ngIf="isLogin" />
          <app-register-form *ngIf="!isLogin" />

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">
                  {{ isLogin ? 'New to our platform?' : 'Already have an account?' }}
                </span>
              </div>
            </div>

            <div class="mt-6 text-center">
              <button
                (click)="toggleAuthMode()"
                class="text-blue-600 hover:text-blue-500"
              >
                {{ isLogin ? 'Create an account' : 'Sign in to your account' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AuthComponent {
  isLogin = true;

  toggleAuthMode() {
    this.isLogin = !this.isLogin;
  }
}