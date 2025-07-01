import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Websocket } from '../services/websocket';
import { FleetTruckLocationData } from '../models/data.models';

@Component({
  selector: 'app-fleet',
  imports: [],
  template: `
    <section class="flex justify-center items-center p-8">
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-4">
        <h1 class="text-center text-2xl font-bold text-blue-800">Fleet Truck Location</h1>

        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <span class="text-gray-700 font-medium">Truck ID:</span>
          </div>
          <span class="font-mono text-sm">{{fleetData.truck_id}}</span>
        </div>

        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <span class="text-gray-700 font-medium">Heading Degrees:</span>
          </div>
          <span class="font-mono">{{fleetData.heading_degrees}}</span>
        </div>

        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <span class="text-gray-700 font-medium">Latitude:</span>
          </div>
          <span class="font-mono">{{fleetData.latitude}}</span>
        </div>

        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <span class="text-gray-700 font-medium">Longitude:</span>
          </div>
            <span class="font-mono">{{fleetData.longitude}}</span>
        </div>

        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <span class="text-gray-700 font-medium">Speed:</span>
          </div>
          <span class="font-mono">{{fleetData.speed_kph}} Km/H</span>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class Fleet implements OnInit, OnDestroy {
  fleetData: FleetTruckLocationData = {
    truck_id: "",
    heading_degrees: 0,
    latitude: 0,
    longitude: 0,
    speed_kph: 0,
    timestamp: ""
  };
  private websocketSub: Subscription | undefined;

  constructor(private websocketService: Websocket, private cdr: ChangeDetectorRef){};

  ngOnInit(): void {
    this.websocketSub = this.websocketService.messages$.subscribe({
      next: (message) => {
        const messageFiltered = typeof message !== 'object' ? JSON.parse(message) : message;
        this.fleetData = messageFiltered['fleet/truck_101/location'];
        this.cdr.detectChanges();
      }
    })
  }

  ngOnDestroy(): void {
    if (this.websocketSub) {
      this.websocketSub.unsubscribe();
    }
  }
}
