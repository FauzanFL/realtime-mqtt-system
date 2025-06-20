import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <app-header title={{this.title}}/>
    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected title = 'Realtime Monitoring System';
}
