import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-dark-background dark:text-dark-text flex flex-col transition-colors duration-300">
      <app-header />
      <main class="flex-1 container mx-auto px-4 py-6 text-base md:text-mobile-large">
        <router-outlet />
      </main>
    </div>
  `,
  host: {
    class: 'block dark:bg-dark-background dark:text-dark-text'
  }
})
export class AppComponent implements OnInit {
  title = 'Global Sky Object Tracker';

  ngOnInit() {
    // Optional: Add a method to toggle dark mode
    this.initDarkMode();
  }

  private initDarkMode() {
    // Check user's system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDarkScheme.matches) {
      document.documentElement.classList.add('dark');
    }

    // Optional: Listen for system dark mode changes
    prefersDarkScheme.addEventListener('change', (e) => {
      document.documentElement.classList.toggle('dark', e.matches);
    });
  }

  // Optional method to manually toggle dark mode
  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
}