import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';

import * as L from 'leaflet';

@Component({
  selector: 'app-realtime-map-display',
  standalone: true,
  imports: [CommonModule, LeafletModule],
  template: `
    <section class="w-full h-[87.2dvh]">
      <div 
        class="w-full h-full"
        leaflet
        [leafletOptions]="options"
        [leafletLayers]="layers"
        (leafletMapReady)="onMapReady($event)"
      ></div>
    </section>
  `,
  styles: ``
})
export class RealtimeMapDisplay implements OnInit, OnChanges {
  @Input() lat!: number;
  @Input() long!: number;
  @Input() heading: number = 0;
  @Input() truckId: string = "";
  @Input() speed: number = 0;

  private map!: L.Map;
  private marker!: L.Marker;

  options: L.MapOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      })
    ],
    zoom: 13
  };

  layers: L.Layer[] = [];

  constructor() {
    const defaultIcon = L.icon({
      iconRetinaUrl: 'assets/img/truck.png',
      iconUrl: 'assets/img/truck.png',
      iconSize: [40, 40],    // Ukuran ikon
      iconAnchor: [12, 41],  // Titik jangkar ikon
      popupAnchor: [1, -34], // Titik jangkar popup
      tooltipAnchor: [16, -20], // Titik jangkar tooltip
      shadowSize: [41, 41]   // Ukuran bayangan
    });

    L.Marker.prototype.options.icon = defaultIcon;
  }

  ngOnInit(): void {
    this.marker = L.marker([this.lat, this.long]);
    this.layers = [this.marker];
    this.updatePopupContent();
  }
  
  onMapReady(map: L.Map) {
    this.map = map;
    this.map.setView(L.latLng(this.lat, this.long), this.options.zoom);
    setTimeout(() => {
      if (this.marker) {
        this.marker.openPopup();
      }
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.map && (changes['lat'] || changes['long'])) {
      const newLatLng = L.latLng(this.lat, this.long);

      this.marker.setLatLng(newLatLng);
      this.updatePopupContent();

      this.map.setView(newLatLng, this.map.getZoom());
    }
  }

  private updatePopupContent(): void {
    const popupContent = `
      Truck ID: <b>${this.truckId}</b><br>
      Heading Degree: <b>${this.heading}</b><br>
      Speed: <b>${this.speed} Km/H</b><br>
    `;
    this.marker.bindPopup(popupContent);
  }
}
