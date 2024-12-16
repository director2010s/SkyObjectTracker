import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { Subject, takeUntil } from 'rxjs';
import { SkyObjectService, SkyObjectFilters } from '../../services/sky-object.service';
import { MapConfigService } from '../../services/map-config.service';
import { MapMarkerComponent } from './map-marker/map-marker.component';
import { MapPopupComponent } from './map-popup/map-popup.component';
import { MapMarkerIconComponent } from './map-marker-icon/map-marker-icon.component';
import { MapLegendComponent } from './map-legend/map-legend.component';
import { SkyObject, ObjectType } from '../../models/sky-object.model';
import { ErrorMessageComponent } from '../shared/error-message.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner.component';
import { createMarkerIcon } from '../../utils/map.utils';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FilterState, FilterChange } from '../../components/filters/filter.types';

@Component({
  selector: 'app-sky-map',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MapMarkerComponent,
    MapPopupComponent,
    MapMarkerIconComponent,
    MapLegendComponent,
    ErrorMessageComponent,
    LoadingSpinnerComponent
  ],
  template: `
    <div [formGroup]="mapForm" class="bg-white rounded-lg shadow-md overflow-hidden relative">
      <div class="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <app-map-legend
          (filterChange)="updateFilters($event)"
        />
      </div>
      
      <div class="relative d-none">
        <!-- Map Container with Dynamic Height -->
        <div 
          id="map" 
          class="w-full"
          [style.height]="'calc(100vh - 300px)'"
          [style.min-height]="'400px'"
          style="z-index: 0;"
        ></div>
        
        <app-loading-spinner *ngIf="isLoading" />
        
        <app-error-message
          *ngIf="error"
          [message]="error"
          (retry)="loadMarkers()"
        />
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    :host ::ng-deep {
      .leaflet-popup-content {
        font-size: 16px;
      }
      
      .leaflet-container {
        font-size: 16px;
      }
    }

    @media (max-width: 768px) {
      #map {
        height: calc(100vh - 200px) !important;
      }
      
      :host ::ng-deep {
        .leaflet-popup-content {
          font-size: 18px;
        }
        
        .leaflet-container {
          font-size: 18px;
        }
        
        .leaflet-control-zoom a {
          font-size: 20px;
          padding: 6px 8px;
        }
      }
    }
  `]
})
export class SkyMapComponent implements OnInit, OnDestroy {
  private map!: L.Map;
  private markers: L.Marker[] = [];
  private destroy$ = new Subject<void>();
  private currentFilters: FilterState = {
    dateRange: { start: null, end: null },
    objectTypes: [],
    location: {
      country: '',
      region: '',
      city: '',
      address: ''
    }
  };
  
  isLoading = false;
  error: string | null = null;
  mapForm: FormGroup;

  constructor(
    private skyObjectService: SkyObjectService,
    private mapConfigService: MapConfigService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.mapForm = this.fb.group({
      objectTypes: [[]],
      dateRange: this.fb.group({
        start: [null],
        end: [null]
      })
    });
  }

  ngOnInit() {
    this.initializeMap();
    this.loadMarkers();

    // Subscribe to form changes
    this.mapForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.updateFilters({ type: 'objectTypes', value: value.objectTypes });
        this.updateFilters({ type: 'dateRange', value: value.dateRange });
      });

    // Set initial date range
    const today = new Date();
    const startDate = new Date(2024, 11, 1); // December 1, 2024
    const endDate = new Date(2024, 11, 15); // December 15, 2024
    this.updateFilters({ type: 'dateRange', value: { start: startDate, end: endDate } });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.map) {
      this.map.remove();
    }
  }

  private initializeMap() {
    // Remove existing map if it exists
    if (this.map) {
      this.map.remove();
    }

    // Create new map instance
    this.map = L.map('map').setView(
      [this.mapConfigService.defaultCenter.lat, this.mapConfigService.defaultCenter.lng],
      this.mapConfigService.defaultZoom
    );

    L.tileLayer(this.mapConfigService.mapTileUrl, {
      attribution: ' OpenStreetMap contributors'
    }).addTo(this.map);

    // Handle window resize without reloading
    const resizeHandler = () => {
      if (this.map) {
        this.map.invalidateSize();
      }
    };

    window.removeEventListener('resize', resizeHandler);
    window.addEventListener('resize', resizeHandler);
  }

  updateFilters(change: FilterChange) {
    switch (change.type) {
      case 'objectTypes':
        this.currentFilters.objectTypes = change.value;
        break;
      case 'dateRange':
        this.currentFilters.dateRange = change.value;
        break;
      case 'location':
        // Location filters are not currently used in the map view
        break;
    }
    this.loadMarkers();
  }

  loadMarkers() {
    this.isLoading = true;
    this.error = null;
    this.clearMarkers();

    const filters: SkyObjectFilters = {
      dateRange: this.currentFilters.dateRange,
      objectTypes: this.currentFilters.objectTypes,
      location: {
        country: this.currentFilters.location.country,
        region: this.currentFilters.location.region,
        city: this.currentFilters.location.city,
        address: this.currentFilters.location.address
      }
    };

    this.skyObjectService.getObjects(filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (objects) => {
          objects.forEach(obj => this.addMarker(obj));
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error loading markers:', err);
          this.error = 'Failed to load map markers. Please try again.';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }

  private addMarker(object: SkyObject) {
    const marker = L.marker(
      [object.coordinates.latitude, object.coordinates.longitude],
      {
        icon: createMarkerIcon(object.type, this.mapConfigService)
      }
    );

    const popupContent = document.createElement('div');
    const popup = L.popup().setContent(popupContent);
    marker.bindPopup(popup);

    marker.addTo(this.map);
    this.markers.push(marker);
  }

  private clearMarkers() {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }
}