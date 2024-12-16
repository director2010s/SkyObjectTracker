import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          
          <div class="flex items-center">
            <button
              type="button"
              class="ml-3 text-gray-700 hover:text-gray-900"
            >
              <span class="sr-only">View notifications</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            <div class="ml-4 relative flex items-center">
              <button
                type="button"
                class="flex items-center text-sm text-gray-700 hover:text-gray-900"
              >
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
                  alt="Admin"
                />
                <span class="ml-2">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class AdminHeaderComponent {}