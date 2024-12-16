import { ObjectType } from '../../models/sky-object.model';

export const OBJECT_TYPES: { type: ObjectType; description: string }[] = [
  {
    type: 'Drone',
    description: 'Commercial or recreational unmanned aerial vehicle'
  },
  {
    type: 'UFO',
    description: 'Unidentified Flying Object with unknown characteristics'
  },
  {
    type: 'Light',
    description: 'Unexplained light phenomena in the sky'
  },
  {
    type: 'Other',
    description: 'Other aerial phenomena not fitting the above categories'
  }
];