import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <header class="bg-gradient-to-r from-blue-500 to-indigo-700 text-white shadow-lg p-4 sm:px-6 md:px-8 flex items-center justify-between">
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">{{title()}}</h1>

      <nav class="hidden md:flex space-x-2">
        <a
          routerLink="/smarthome"
          class="text-white hover:text-yellow-200 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors duration-200 text-lg font-semibold">
          Smart Home
        </a>
        <a
          routerLink="/fleet"
          class="text-white hover:text-yellow-200 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors duration-200 text-lg font-semibold">
          Fleet
        </a>
        <a
          routerLink="/factory"
          class="text-white hover:text-yellow-200 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors duration-200 text-lg font-semibold">
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
