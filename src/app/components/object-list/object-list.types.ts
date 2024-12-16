import { SkyObject } from '../../models/sky-object.model';
import { SkyObjectFilters } from '../../services/sky-object.service';

export interface ObjectListState {
  objects: SkyObject[];
  selectedObject: SkyObject | null;
  isLoading: boolean;
  error: string | null;
  filters: SkyObjectFilters;
}

export interface ObjectListProps {
  object: SkyObject;
  isActive: boolean;
}