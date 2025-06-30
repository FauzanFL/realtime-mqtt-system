import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Websocket } from '../services/websocket';

@Component({
  selector: 'app-factory',
  imports: [],
  template: `
    <p>
      factory works!
    </p>
  `,
  styles: ``
})
export class Factory implements OnInit, OnDestroy {
  factoryData: Factory | Object = {};
  private websocketSub: Subscription | undefined;

  constructor(private websockteService: Websocket){};

  ngOnInit(): void {
    this.websocketSub = this.websockteService.messages$.subscribe({
      next: (message) => {
        const messageFiltered = typeof message !== 'object' ? JSON.parse(message) : message;
        this.factoryData = messageFiltered['factory/line_A/machine_status'];
        // console.log(this.factoryData);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.websocketSub) {
      this.websocketSub.unsubscribe();
    }
  }
}
