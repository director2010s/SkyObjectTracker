import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _currentTheme = new BehaviorSubject<Theme>('system');
  currentTheme$ = this._currentTheme.asObservable();

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme() {
    // Check local storage for saved theme
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('system');
    }
  }

  setTheme(theme: Theme) {
    this._currentTheme.next(theme);
    localStorage.setItem('app-theme', theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: Theme) {
    // Remove existing theme classes
    document.documentElement.classList.remove('light', 'dark');

    switch (theme) {
      case 'dark':
        document.documentElement.classList.add('dark');
        break;
      case 'light':
        document.documentElement.classList.add('light');
        break;
      case 'system':
      default:
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        document.documentElement.classList.toggle('dark', prefersDark.matches);
        break;
    }
  }

  toggleTheme() {
    const currentTheme = this._currentTheme.value;
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    this.setTheme(nextTheme);
    return nextTheme;
  }
}
