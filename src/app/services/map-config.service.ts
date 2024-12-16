import { Injectable } from '@angular/core';
import { ObjectType } from '../models/sky-object.model';

@Injectable({
  providedIn: 'root'
})
export class MapConfigService {
  // Using OpenStreetMap tiles instead of Thunderforest to avoid API key requirement
  readonly mapTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  
  readonly defaultCenter = { lat: 40.7128, lng: -74.0060 }; // New York City
  readonly defaultZoom = 3;

  readonly markerColors: Record<ObjectType, string> = {
    'Drone': '#4CAF50', // Green
    'UFO': '#2196F3',   // Blue
    'Other': '#F44336', // Red
    'Light': '#FFC107'  // Yellow
  };

  getMarkerColor(type: ObjectType): string {
    return this.markerColors[type] || this.markerColors['Other'];
  }
}