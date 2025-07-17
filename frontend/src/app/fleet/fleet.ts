import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Websocket } from '../services/websocket';
import { FleetTruckLocationData } from '../models/data.models';
import { RealtimeMapDisplay } from "../components/realtime-map-display/realtime-map-display";
import { Loading } from '../services/loading';

@Component({
  selector: 'app-fleet',
  imports: [RealtimeMapDisplay],
  template: `
    <app-realtime-map-display
      [lat]="fleetData().latitude"
      [long]="fleetData().longitude"
      [heading]="fleetData().heading_degrees"
      [truckId]="fleetData().truck_id"
      [speed]="fleetData().speed_kph"
    />
  `,
  styles: ``
})
export class Fleet implements OnInit, OnDestroy {
  fleetData = signal<FleetTruckLocationData>({
    truck_id: "",
    heading_degrees: 0,
    latitude: 0,
    longitude: 0,
    speed_kph: 0,
    timestamp: ""
  });
  private websocketSub: Subscription | undefined;

  constructor(private websocketService: Websocket, private loadingService: Loading){};

  ngOnInit(): void {
    this.loadingService.show();
    this.websocketSub = this.websocketService.messages$.subscribe({
      next: (message) => {
        const messageFiltered = typeof message !== 'object' ? JSON.parse(message) : message;
        this.fleetData.set(messageFiltered['fleet/truck_101/location']);
        
        this.loadingService.hide();
      },
      error: (err) => console.error(err),
    })
  }

  ngOnDestroy(): void {
    if (this.websocketSub) {
      this.websocketSub.unsubscribe();
    }
  }
}
