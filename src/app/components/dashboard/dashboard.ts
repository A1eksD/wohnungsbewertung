import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {Map} from './map/map';
import {Reviews} from './reviews/reviews';
import {Suggestions} from '../../interfaces/suggestions';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule, MatAutocompleteModule, Map, Reviews],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard {
  address = '';
  suggestions: Array<Suggestions> = [];
  private searchTimer?: number;

  onAddressChange(q: string) {
    this.address = q;
    if (this.searchTimer) {
      window.clearTimeout(this.searchTimer);
    }
    if (!q || q.trim().length < 3) {
      this.suggestions = [];
      return;
    }
    this.searchTimer = window.setTimeout(() => {
      this.fetchSuggestions(q.trim());
    }, 300);
  }

  private async fetchSuggestions(q: string) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5&addressdetails=1`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      const data: Array<{ lat: string; lon: string; display_name: string; address?: any }> = await res.json();
      this.suggestions = data.map(d => {
        const a = d.address || {};
        const house = a.house_number ? String(a.house_number) : '';
        const road = a.road ? String(a.road) : '';
        const postcode = a.postcode ? String(a.postcode) : '';
        const city = String(a.city || a.town || a.village || a.municipality || a.suburb || '');
        const streetPart = [road, house].filter(Boolean).join(' ').trim();
        const label = [streetPart, postcode, city].filter(Boolean).join(', ');
        return ({ label: label || d.display_name, lat: parseFloat(d.lat), lon: parseFloat(d.lon) });
      });
    } catch (e) {
      this.suggestions = [];
    }
  }

  onSelectSuggestion(label: string, mapCmp: any) {
    this.address = label;
    mapCmp.goToAddress(label);
  }

  normalize(street: string, plz: string, city: string) {
    return `${street}_${plz}_${city}`
      .toLowerCase()
      .replace(/ß/g, 'ss')
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/[^a-z0-9_]/g, '');
  }

}
