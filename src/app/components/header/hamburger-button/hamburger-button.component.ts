import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-hamburger-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      (click)="toggle.emit(!isOpen)"
      class="md:hidden p-2 rounded-lg hover:bg-blue-800 transition-colors duration-200"
      aria-label="Toggle menu"
    >
      <div class="w-6 h-5 relative flex flex-col justify-between">
        <span [ngClass]="{'rotate-45 translate-y-2': isOpen}" 
              class="w-full h-0.5 bg-white transform transition-transform duration-200">
        </span>
        <span [ngClass]="{'opacity-0': isOpen}"
              class="w-full h-0.5 bg-white transition-opacity duration-200">
        </span>
        <span [ngClass]="{'rotate-45 -translate-y-2': isOpen}" 
              class="w-full h-0.5 bg-white transform transition-transform duration-200">
        </span>
      </div>
    </button>
  `
})
export class HamburgerButtonComponent {
  @Input() isOpen = false;
  @Output() toggle = new EventEmitter<boolean>();
}