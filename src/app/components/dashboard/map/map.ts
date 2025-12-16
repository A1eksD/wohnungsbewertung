import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { Dashboard } from '../dashboard';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrls: ['./map.scss'],
})
export class Map implements AfterViewInit {
  private map!: L.Map;
  private marker?: L.Marker;

  constructor(private dashboardCmp: Dashboard) {
  }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([52.52, 13.405], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  public async goToAddress(query: string): Promise<void> {
    if (!query || !this.map) return;
    this.dashboardCmp.showLoadingSpinner = true;
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      const data: Array<{ lat: string; lon: string; display_name: string }> = await res.json();
      if (!data.length) return;
      const { lat, lon, display_name } = data[0];
      const latNum = parseFloat(lat);
      const lonNum = parseFloat(lon);
      this.map.flyTo([latNum, lonNum], 16, { duration: 0.7 });
      if (this.marker) {
        this.marker.setLatLng([latNum, lonNum]).bindPopup(display_name);
      } else {
        this.marker = L.marker([latNum, lonNum]).addTo(this.map).bindPopup(display_name);
      }
      this.marker.openPopup();
    } catch (e) {
      //TODO: add toast
      console.log('Fetch map error',e);
    }
    this.dashboardCmp.showLoadingSpinner = false;
  }
}
