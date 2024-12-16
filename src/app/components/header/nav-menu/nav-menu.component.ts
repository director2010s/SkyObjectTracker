import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav [class.hidden]="!isOpen" class="md:block">
      <ul class="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
        <li>
          <a routerLink="/" routerLinkActive="text-white" [routerLinkActiveOptions]="{exact: true}"
             class="nav-link">
            Dashboard
          </a>
        </li>
        <li>
          <a routerLink="/tracking" routerLinkActive="text-white"
             class="nav-link">
            Tracking
          </a>
        </li>
        <li>
          <a routerLink="/objects" routerLinkActive="text-white"
             class="nav-link">
            Objects
          </a>
        </li>
        <li>
          <a routerLink="/submit-report" routerLinkActive="text-white"
             class="nav-link">
            Report
          </a>
        </li>
        <li>
          <ng-container *ngIf="!(authService.user$ | async); else logoutButton">
            <a routerLink="/login" routerLinkActive="text-white"
               class="nav-link">
              Login / Register
            </a>
          </ng-container>
          <ng-template #logoutButton>
            <button (click)="authService.logout()" class="nav-link">
              Logout
            </button>
          </ng-template>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    .nav-link {
      @apply text-gray-200 hover:text-white transition-colors duration-200;
    }
  `]
})
export class NavMenuComponent {
  @Input() isOpen = false;

  constructor(public authService: AuthService) {}
}