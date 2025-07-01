import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Websocket } from '../services/websocket';
import { FactoryLineAMachineStatusData } from '../models/data.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-factory',
  imports: [CommonModule],
  template: `
    <section class="flex justify-center items-center p-8">
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-4">
        <h1 class="text-center text-2xl font-bold text-blue-800">Factory Machine Status</h1>

        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <span class="text-gray-700 font-medium">Machine ID:</span>
          </div>
          <span class="font-mono text-sm">{{factoryData().machine_id}}</span>
        </div>

        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <span class="text-gray-700 font-medium">Error Code:</span>
          </div>
          <span class="font-mono" [ngClass]="{'text-red-600': factoryData().error_code}">{{factoryData().error_code ? factoryData().error_code : 'NO ERROR'}}</span>
        </div>

        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <span class="text-gray-700 font-medium">Maintenance Required:</span>
          </div>
          <span class="font-mono">{{factoryData().maintenance_required ? 'Yes' : 'No'}}</span>
        </div>

        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <span class="text-gray-700 font-medium">Production Count:</span>
          </div>
            <span class="font-semibold">{{factoryData().production_count}}</span>
        </div>

        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <span class="text-gray-700 font-medium">Status:</span>
          </div>
          <span class="font-mono" [ngClass]="{
            'text-green-600': factoryData().status === 'RUNNING',
            'text-red-600': factoryData().status === 'ERROR',
            'text-yellow-600': factoryData().status === 'OFFLINE',
            'text-gray-600': factoryData().status == 'IDLE'
          }">{{factoryData().status}}</span>
        </div>
      </div>
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
