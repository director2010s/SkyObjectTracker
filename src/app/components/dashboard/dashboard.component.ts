import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyMapComponent } from '../sky-map/sky-map.component';
import { ObjectListComponent } from '../object-list/object-list.component';
import { FilterPanelComponent } from '../filters/filter-panel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SkyMapComponent,
    ObjectListComponent,
    FilterPanelComponent
  ],
  template: `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Filters -->
      <!-- <div class="lg:col-span-3">
        <app-filter-panel />
      </div> -->

      <!-- Map Section -->
      <!-- <div class="lg:col-span-3">
        <app-sky-map />
      </div> -->

      <!-- List Section -->
      <div class="lg:col-span-3">
        <app-object-list />
      </div>
    </div>
  `
})
export class DashboardComponent {}