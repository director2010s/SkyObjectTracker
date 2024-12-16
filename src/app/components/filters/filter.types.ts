export interface FilterState {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  objectTypes: string[];
  location: {
    country: string;
    region: string;
    city: string;
    address: string;
  };
}

export interface FilterChange {
  type: 'dateRange' | 'objectTypes' | 'location';
  value: any;
}