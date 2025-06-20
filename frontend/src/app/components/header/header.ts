import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header class="bg-gradient-to-r from-blue-500 to-indigo-700 text-white shadow-lg p-4 sm:px-6 md:px-8 flex items-center justify-between">
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">{{title()}}</h1>

      <nav class="hidden md:flex space-x-2">
        <a
          class="text-white hover:text-yellow-200 hover:bg-indigo-500 px-4 py-2 rounded-md transition-colors duration-200 text-lg">
          Smart Home
        </a>
        <a 
          class="text-white hover:text-yellow-200 hover:bg-indigo-500 px-4 py-2 rounded-md transition-colors duration-200 text-lg">
          Fleet
        </a>
        <a
          class="text-white hover:text-yellow-200 hover:bg-indigo-500 px-4 py-2 rounded-md transition-colors duration-200 text-lg">
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
