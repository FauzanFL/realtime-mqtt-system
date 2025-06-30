import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="bg-gradient-to-r from-blue-500 to-indigo-700 text-white shadow-lg py-2 px-4 sm:px-6 md:px-8 flex items-center justify-between">
      <section class="flex justify-center items-center">
        <img src="/assets/img/logo.png" alt="" class="w-25 h-25">
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">{{title()}}</h1>
      </section>

      <nav class="hidden md:flex space-x-2">
        <a
          routerLink="/smarthome"
          routerLinkActive="font-bold text-yellow-300 bg-indigo-600"
          class="text-white hover:text-yellow-200 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors duration-200 text-lg font-semibold">
          Smart Home
        </a>
        <a
          routerLink="/fleet"
          routerLinkActive="font-bold text-yellow-300 bg-indigo-600"
          class="text-white hover:text-yellow-200 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors duration-200 text-lg font-semibold">
          Fleet
        </a>
        <a
          routerLink="/factory"
          routerLinkActive="font-bold text-yellow-300 bg-indigo-600"
          class="text-white text hover:text-yellow-200 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors duration-200 text-lg font-semibold">
          Factory
        </a>
      </nav>
    </header>
  `,
  styles: ``
})
export class Header {
  title = input('')
}
