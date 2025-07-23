import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  imports: [CommonModule],
  template: `
    <button 
      class="p-2 w-full flex justify-center items-center border border-white/40 text-white rounded-md outline-none focus:outline-none md:hidden"
      aria-label="Toggle menu"
      (click)="toggleMenu()"
    >
      <div class="relative h-6 -left-3">
          <div 
            class="block w-8 h-1 bg-white absolute left-0 transition-all duration-300 ease-in-out"
            [ngClass]="{'top-1/2 -translate-y-1/2': true, 'opacity-0': isOpen, 'rotate-45': isOpen}"
          ></div>
          <div 
            class="block w-8 h-1 bg-white absolute left-0 transition-all duration-300 ease-in-out"
            [ngClass]="{'top-0': !isOpen, 'top-1/2 -translate-y-1/2 rotate-45':isOpen}"
          ></div>
          <div 
            class="block w-8 h-1 bg-white absolute left-0 transition-all duration-300 ease-in-out"
            [ngClass]="{'bottom-0': !isOpen, 'top-1/2 -translate-y-1/2 -rotate-45': isOpen}"
          ></div>
      </div>
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
