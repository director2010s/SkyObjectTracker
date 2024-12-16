export type ObjectType = 'Drone' | 'UFO' | 'Other' | 'Light';
export type ObjectStatus = 'pending' | 'approved' | 'flagged';

export interface MediaItem {
  url: string;
  key: string;
  caption?: string;
}

export interface Location {
  street: string;
  city: string;
  region: string;
  country: string;
}

export interface SkyObject {
  id: string;
  name: string;
  type: ObjectType;
  subtype?: string;
  description?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  location?: Location;
  reportedAt?: any;
  reportedBy: string;
  status?: ObjectStatus;
  witnesses?: string;
  media?: {
    images?: MediaItem[];
    videos?: MediaItem[];
  };
  createdAt?: any; // Firestore Timestamp
}