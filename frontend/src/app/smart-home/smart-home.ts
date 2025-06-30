import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Websocket } from '../services/websocket';
import { SmartHomeLivingRoomSensorData } from '../models/data.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-smart-home',
  imports: [CommonModule],
  template: `
    <section class="flex justify-center items-center p-8">
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-4">
        <h1 class="text-center text-2xl font-bold text-blue-800">Living Room Sensor</h1>

        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <span class="text-gray-700 font-medium">Device ID:</span>
          </div>
          <span class="font-mono text-sm">{{smartHomeData.device_id}}</span>
        </div>

        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <span class="text-gray-700 font-medium">Humidity:</span>
          </div>
          <span class="font-mono">{{smartHomeData.humidity_percent}} %</span>
        </div>

        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <span class="text-gray-700 font-medium">Light Intensity:</span>
          </div>
          <span class="font-mono">{{smartHomeData.light_lux}} lux</span>
        </div>

        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <span class="text-gray-700 font-medium">Motion Detected:</span>
          </div>
          @if (smartHomeData.motion_detected) {
            <span class="font-semibold text-green-600">Yes</span>
          }
          @else {
            <span class="font-semibold text-red-600">No</span>
          }
        </div>

        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <span class="text-gray-700 font-medium">Temperature:</span>
          </div>
          <span class="font-mono">{{smartHomeData.temperature_celsius}} °C</span>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class SmartHome implements OnInit, OnDestroy {
  smartHomeData: SmartHomeLivingRoomSensorData = {
    device_id: "",
    humidity_percent: 0.0,
    light_lux: 0.0,
    motion_detected: false,
    temperature_celsius: 0.0,
    timestamp: ""
  };
  private websocketSub!: Subscription;

  constructor(private websocketService: Websocket, private cdr: ChangeDetectorRef){};

  ngOnInit(): void {
    this.websocketSub = this.websocketService.messages$.subscribe({
      next: (message) => {
        const messageFiltered = typeof message !== 'object' ? JSON.parse(message) : message;
        
        this.smartHomeData = messageFiltered['smart_home/living_room/sensor'];
        
        // menggunakan detectChanges secara manual (--zoneless)
        this.cdr.detectChanges();
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
