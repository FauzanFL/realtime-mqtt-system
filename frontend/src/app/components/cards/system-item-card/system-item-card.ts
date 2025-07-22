import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-system-item-card',
  standalone: true,
  imports: [],
  template: `
    <section class="w-full h-full flex flex-col items-center bg-white rounded-2xl shadow-lg p-4">
      <h3 class="text-2xl font-bold pt-2 mb-2">{{title}}</h3>
      <ng-content></ng-content>
    </section>
  `,
  styles: ``
})
export class SystemItemCard {
  @Input() title: string = 'Title'
}
