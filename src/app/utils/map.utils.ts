import * as L from 'leaflet';
import { ObjectType } from '../models/sky-object.model';
import { MapConfigService } from '../services/map-config.service';

/**
 * Creates a custom marker icon for the map based on the object type
 * @param type - The type of sky object
 * @param mapConfig - The map configuration service
 * @returns A Leaflet DivIcon instance
 */
export function createMarkerIcon(type: ObjectType, mapConfig: MapConfigService): L.DivIcon {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${mapConfig.getMarkerColor(type)};
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 4px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });
}

/**
 * Validates coordinates to ensure they are within valid ranges
 * @param lat - Latitude value
 * @param lng - Longitude value
 * @returns boolean indicating if coordinates are valid
 */
export function validateCoordinates(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}