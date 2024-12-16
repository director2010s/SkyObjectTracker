import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HamburgerButtonComponent } from './hamburger-button/hamburger-button.component';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavMenuComponent,
    HamburgerButtonComponent
  ],
  template: `
    <header class="bg-blue-900 text-white">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <a routerLink="/" class="text-xl font-bold hover:text-gray-200">
              Global Sky Object Tracker
            </a>
          </div>

          <!-- Theme Toggle -->
          <div class="flex items-center space-x-4">
            <button 
              (click)="toggleTheme()"
              class="p-2 rounded-full hover:bg-blue-800 transition-colors"
              aria-label="Toggle Theme"
            >
              <span *ngIf="currentTheme === 'light'">🌙 Dark</span>
              <span *ngIf="currentTheme === 'dark'">☀️ Light</span>
              <span *ngIf="currentTheme === 'system'">🖥️ System</span>
            </button>

            <!-- Hamburger button -->
            <app-hamburger-button
              [isOpen]="isMenuOpen"
              (toggle)="isMenuOpen = $event"
              class="md:hidden"
            />
          </div>

          <!-- Navigation menu -->
          <app-nav-menu [isOpen]="isMenuOpen" class="hidden md:block" />
        </div>

        <!-- Mobile menu -->
        <div class="md:hidden" [class.hidden]="!isMenuOpen">
          <app-nav-menu [isOpen]="true" />
        </div>
      </div>
    </header>
  `,
  host: {
    class: 'block'
  },
  styles: [`
    :host {
      @apply sticky top-0 z-50;
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;
  currentTheme: Theme = 'system';

  constructor(private themeService: ThemeService) {
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  toggleTheme() {
    this.currentTheme = this.themeService.toggleTheme();
  }
}