import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkyMapComponent } from './sky-map.component';
import { SkyObjectService } from '../../services/sky-object.service';
import { MapConfigService } from '../../services/map-config.service';
import { of, throwError } from 'rxjs';

describe('SkyMapComponent', () => {
  let component: SkyMapComponent;
  let fixture: ComponentFixture<SkyMapComponent>;
  let skyObjectService: jasmine.SpyObj<SkyObjectService>;
  let mapConfigService: jasmine.SpyObj<MapConfigService>;

  beforeEach(async () => {
    const skyObjectSpy = jasmine.createSpyObj('SkyObjectService', ['getObjects']);
    const mapConfigSpy = jasmine.createSpyObj('MapConfigService', ['getMarkerColor']);

    await TestBed.configureTestingModule({
      imports: [SkyMapComponent],
      providers: [
        { provide: SkyObjectService, useValue: skyObjectSpy },
        { provide: MapConfigService, useValue: mapConfigSpy }
      ]
    }).compileComponents();

    skyObjectService = TestBed.inject(SkyObjectService) as jasmine.SpyObj<SkyObjectService>;
    mapConfigService = TestBed.inject(MapConfigService) as jasmine.SpyObj<MapConfigService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkyMapComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load markers on init', () => {
    const mockObjects = [
      {
        id: '1',
        name: 'Test Object',
        type: 'Drone',
        coordinates: { latitude: 0, longitude: 0 },
        reportedAt: new Date(),
        reportedBy: 'Test User'
      }
    ];

    skyObjectService.getObjects.and.returnValue(of(mockObjects));
    fixture.detectChanges();

    expect(skyObjectService.getObjects).toHaveBeenCalled();
  });

  it('should handle errors when loading markers', () => {
    skyObjectService.getObjects.and.returnValue(throwError(() => new Error('Test error')));
    fixture.detectChanges();

    expect(component.error).toBeTruthy();
    expect(component.isLoading).toBeFalse();
  });
});