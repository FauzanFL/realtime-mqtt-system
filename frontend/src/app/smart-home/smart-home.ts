import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Websocket } from '../services/websocket';
import { SmartHomeLivingRoomSensorData } from '../models/data.models';
import { CommonModule } from '@angular/common';
import { HumidityChart } from "../components/charts/humidity-chart/humidity-chart";
import { SystemItemCard } from "../components/cards/system-item-card/system-item-card";
import { TemperatureChart } from "../components/charts/temperature-chart/temperature-chart";
import { LightIntensity } from "../components/elements/light-intensity/light-intensity";
import { MotionDetected } from "../components/elements/motion-detected/motion-detected";
import { Loading } from '../services/loading';
import { LocalStorageCache } from '../services/local-storage-cache';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-smart-home',
  imports: [CommonModule, HumidityChart, SystemItemCard, TemperatureChart, LightIntensity, MotionDetected],
  template: `
    <section class="flex flex-col justify-between p-8">
      <section class="px-2 py-4">
        <h2 class="text-xl font-semibold">Device ID: <span class="font-bold">{{smartHomeData().device_id}}</span></h2>
      </section>
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <app-system-item-card title="Humidity">
          <app-humidity-chart [humidityValue]="smartHomeData().humidity_percent" />
        </app-system-item-card>
        <app-system-item-card title="Temperature">
          <app-temperature-chart [temperatureValue]="smartHomeData().temperature_celsius" [minTemp]="0" [maxTemp]="100" />
        </app-system-item-card>
        <app-system-item-card title="Light Intensity">
          <app-light-intensity [luxValue]="smartHomeData().light_lux"/>
        </app-system-item-card>
        <app-system-item-card title="Motion">
          <app-motion-detected [motionDetected]="smartHomeData().motion_detected"/>
        </app-system-item-card>
      </section>
    </section>
  `,
  styles: ``
})
export class SmartHome implements OnInit, OnDestroy {
  smartHomeData = signal<SmartHomeLivingRoomSensorData>({
    device_id: "",
    humidity_percent: 0.0,
    light_lux: 0.0,
    motion_detected: false,
    temperature_celsius: 0.0,
    timestamp: ""
  });
  private websocketSub!: Subscription;
  private cacheKey: string = environment.cacheKey;

  constructor(private websocketService: Websocket, private loadingService: Loading, private cacheService: LocalStorageCache){};

  ngOnInit(): void {
    this.loadingService.show();
    this.loadInitialDataFromCache();
    this.subscribeToWebsocket();
  }

  ngOnDestroy(): void {
    if (this.websocketSub) {
      this.websocketSub.unsubscribe();
    }
  }

  private loadInitialDataFromCache(): void {
    const cachedData = this.cacheService.get<any>(this.cacheKey);
    if (cachedData) {
      this.smartHomeData.set(cachedData['smart_home/living_room/sensor']);
      this.loadingService.hide();
    }
  }

  private subscribeToWebsocket(): void {
    this.websocketSub = this.websocketService.messages$.subscribe({
      next: (message) => {
        const messageFiltered = typeof message !== 'object' ? JSON.parse(message) : message;
        this.smartHomeData.set(messageFiltered['smart_home/living_room/sensor']);
        this.cacheService.set(this.cacheKey, messageFiltered);
        
        this.loadingService.hide();
      },
      error: (err) => console.error(err),
    })
  }
}
