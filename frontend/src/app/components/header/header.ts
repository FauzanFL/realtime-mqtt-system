import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HamburgerMenu } from "../hamburger-menu/hamburger-menu";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, HamburgerMenu, CommonModule],
  template: `
    <header class="bg-gradient-to-r from-blue-500 to-indigo-700 text-white shadow-lg py-2 px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center justify-between">
      <section class="flex justify-center items-center gap-4">
        <img src="/assets/img/logo.png" alt="" class="w-20 h-20 my-2 bg-slate-100 rounded-full">
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">{{title()}}</h1>
      </section>

      <section class="flex flex-col gap-2 md:hidden justify-center items-center w-full">
        <app-hamburger-menu class="w-full" (menuToggle)="onMenuToggled($event)" />
        <nav 
          class="flex flex-col justify-around items-center duration-300 bg-white/10 w-full" 
          [ngClass]="{'max-h-0': !menuOpen, 'max-h-screen': menuOpen}"
        >
          <a
            routerLink="/smarthome"
            class="text-white hover:text-yellow-200 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors duration-200 text-xl font-semibold">
            Smart Home
          </a>
          <a
            routerLink="/fleet"
            class="text-white hover:text-yellow-200 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors duration-200 text-xl font-semibold">
            Fleet
          </a>
          <a
            routerLink="/factory"
            class="text-white hover:text-yellow-200 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors duration-200 text-xl font-semibold">
            Factory
          </a>
        </nav>
      </section>

      <nav class="hidden md:flex space-x-2">
        <a
          routerLink="/smarthome"
          routerLinkActive="font-bold text-yellow-300 bg-indigo-600"
          class="text-white hover:text-yellow-200 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors duration-200 text-xl font-semibold">
          Smart Home
        </a>
        <a
          routerLink="/fleet"
          routerLinkActive="font-bold text-yellow-300 bg-indigo-600"
          class="text-white hover:text-yellow-200 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors duration-200 text-xl font-semibold">
          Fleet
        </a>
        <a
          routerLink="/factory"
          routerLinkActive="font-bold text-yellow-300 bg-indigo-600"
          class="text-white text hover:text-yellow-200 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors duration-200 text-xl font-semibold">
          Factory
        </a>
      </nav>
    </header>
  `,
  styles: ``
})
export class Header {
  title = input('')
  menuOpen: boolean = false;

  onMenuToggled(isOpen: boolean) {
    this.menuOpen = isOpen;
  }

  closeMenu() {this.menuOpen = false;}
}
