import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Websocket } from '../services/websocket';
import { FactoryLineAMachineStatusData } from '../models/data.models';
import { CommonModule } from '@angular/common';
import { SystemItemCard } from "../components/cards/system-item-card/system-item-card";

@Component({
  selector: 'app-factory',
  imports: [CommonModule, SystemItemCard],
  template: `
    <section class="flex flex-col justify-between p-8">
      <section class="px-2 py-4">
        <h2 class="text-xl font-semibold">Machine ID: <span class="font-bold">{{factoryData().machine_id}}</span></h2>
      </section>
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <app-system-item-card title="Production Count">
          <div class="w-full flex justify-center items-center text-xl font-semibold py-5">
            <span>{{factoryData().production_count}} unit</span>
          </div>
        </app-system-item-card>
        <app-system-item-card title="Status">
          <div class="w-full flex justify-center items-center text-xl font-semibold py-5">
            <span class="font-mono" [ngClass]="{
              'text-green-600': factoryData().status === 'RUNNING',
              'text-red-600': factoryData().status === 'ERROR',
              'text-yellow-600': factoryData().status === 'OFFLINE',
              'text-gray-600': factoryData().status == 'IDLE'
            }">{{factoryData().status}}</span>
          </div>
        </app-system-item-card>
        <app-system-item-card title="Maintenance Required">
          <div class="w-full flex justify-center items-center text-xl font-semibold py-5">
            <span class="font-mono" [ngClass]="{'text-red-600': factoryData().maintenance_required}">{{factoryData().maintenance_required ? 'Yes' : 'No'}}</span>
          </div>
        </app-system-item-card>
        <app-system-item-card title="Error Code">
          <div class="w-full flex justify-center items-center text-xl font-semibold py-5">
            <span class="font-mono" [ngClass]="{'text-red-600': factoryData().error_code}">{{factoryData().error_code ? factoryData().error_code : 'NO ERROR'}}</span>
          </div>
        </app-system-item-card>
      </section>
    </section>
  `,
  styles: ``
})
export class Factory implements OnInit, OnDestroy {
  factoryData = signal<FactoryLineAMachineStatusData>({
    machine_id: "",
    error_code: "",
    maintenance_required: false,
    pressure_psi: 0.0,
    production_count: 0,
    status: "OFFLINE",
    timestamp: ""
  });
  private websocketSub: Subscription | undefined;

  constructor(private websockteService: Websocket){};

  ngOnInit(): void {
    this.websocketSub = this.websockteService.messages$.subscribe({
      next: (message) => {
        const messageFiltered = typeof message !== 'object' ? JSON.parse(message) : message;
        this.factoryData.set(messageFiltered['factory/line_A/machine_status']);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.websocketSub) {
      this.websocketSub.unsubscribe();
    }
  }
}
