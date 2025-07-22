import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  imports: [CommonModule],
  template: `
    <button 
      class="p-2 border border-white/40 text-white rounded-md outline-none focus:outline-none md:hidden"
      aria-label="Toggle menu"
      (click)="toggleMenu()"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-8 w-8" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        stroke-width="2"
        [ngClass]="{'block': !isOpen, 'hidden': isOpen}" 
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>

      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-8 w-8" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        stroke-width="2"
        [ngClass]="{'block': isOpen, 'hidden': !isOpen}" 
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  `,
  styles: ``
})
export class HamburgerMenu {
  isOpen: boolean = false;

  @Output() menuToggle = new EventEmitter<boolean>();

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.menuToggle.emit(this.isOpen);
  }
}
