import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { LoadingSpinner } from './components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, LoadingSpinner],
  template: `
    <app-header title={{this.title}}/>
    <router-outlet />
    <app-loading-spinner></app-loading-spinner>
  `,
  styles: [],
})
export class App {
  protected title = 'Realtime Monitoring System';
}
