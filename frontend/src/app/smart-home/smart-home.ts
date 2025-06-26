import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Websocket } from '../services/websocket';
import { RealtimeMessage } from '../models/data.models';

@Component({
  selector: 'app-smart-home',
  imports: [],
  template: `
    <p>
      smart-home works!
    </p>
  `,
  styles: ``
})
export class SmartHome implements OnInit, OnDestroy {
  smartHomeData: SmartHome | Object = {};
  private websocketSub: Subscription | undefined;

  constructor(private websocketService: Websocket){};

  ngOnInit(): void {
    this.websocketSub = this.websocketService.messages$.subscribe({
      next: (message) => {
        const messageFiltered = typeof message !== 'object' ? JSON.parse(message) : message;
        
        this.smartHomeData = messageFiltered['smart_home/living_room/sensor'];
        console.log(this.smartHomeData);
        
      }
    })
  }

  ngOnDestroy(): void {
    if (this.websocketSub) {
      this.websocketSub.unsubscribe();
    }
  }
}
