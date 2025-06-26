import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Websocket } from '../services/websocket';

@Component({
  selector: 'app-fleet',
  imports: [],
  template: `
    <p>
      fleet works!
    </p>
  `,
  styles: ``
})
export class Fleet implements OnInit, OnDestroy {
  fleetData: Fleet | Object = {};
  private websocketSub: Subscription | undefined;

  constructor(private websocketService: Websocket){};

  ngOnInit(): void {
    this.websocketSub = this.websocketService.messages$.subscribe({
      next: (message) => {
        const messageFiltered = typeof message !== 'object' ? JSON.parse(message) : message;
        this.fleetData = messageFiltered['fleet/truck_101/location'];
        console.log(this.fleetData);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.websocketSub) {
      this.websocketSub.unsubscribe();
    }
  }
}
