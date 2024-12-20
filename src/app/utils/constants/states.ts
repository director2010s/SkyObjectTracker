export interface State {
  code: string;
  name: string;
  countryCode: string;
}

// US States
export const US_STATES: State[] = [
  { code: 'AL', name: 'Alabama', countryCode: 'US' },
  { code: 'AK', name: 'Alaska', countryCode: 'US' },
  { code: 'AZ', name: 'Arizona', countryCode: 'US' },
  { code: 'AR', name: 'Arkansas', countryCode: 'US' },
  { code: 'CA', name: 'California', countryCode: 'US' },
  { code: 'CO', name: 'Colorado', countryCode: 'US' },
  { code: 'CT', name: 'Connecticut', countryCode: 'US' },
  { code: 'DE', name: 'Delaware', countryCode: 'US' },
  { code: 'FL', name: 'Florida', countryCode: 'US' },
  { code: 'GA', name: 'Georgia', countryCode: 'US' },
  { code: 'HI', name: 'Hawaii', countryCode: 'US' },
  { code: 'ID', name: 'Idaho', countryCode: 'US' },
  { code: 'IL', name: 'Illinois', countryCode: 'US' },
  { code: 'IN', name: 'Indiana', countryCode: 'US' },
  { code: 'IA', name: 'Iowa', countryCode: 'US' },
  { code: 'KS', name: 'Kansas', countryCode: 'US' },
  { code: 'KY', name: 'Kentucky', countryCode: 'US' },
  { code: 'LA', name: 'Louisiana', countryCode: 'US' },
  { code: 'ME', name: 'Maine', countryCode: 'US' },
  { code: 'MD', name: 'Maryland', countryCode: 'US' },
  { code: 'MA', name: 'Massachusetts', countryCode: 'US' },
  { code: 'MI', name: 'Michigan', countryCode: 'US' },
  { code: 'MN', name: 'Minnesota', countryCode: 'US' },
  { code: 'MS', name: 'Mississippi', countryCode: 'US' },
  { code: 'MO', name: 'Missouri', countryCode: 'US' },
  { code: 'MT', name: 'Montana', countryCode: 'US' },
  { code: 'NE', name: 'Nebraska', countryCode: 'US' },
  { code: 'NV', name: 'Nevada', countryCode: 'US' },
  { code: 'NH', name: 'New Hampshire', countryCode: 'US' },
  { code: 'NJ', name: 'New Jersey', countryCode: 'US' },
  { code: 'NM', name: 'New Mexico', countryCode: 'US' },
  { code: 'NY', name: 'New York', countryCode: 'US' },
  { code: 'NC', name: 'North Carolina', countryCode: 'US' },
  { code: 'ND', name: 'North Dakota', countryCode: 'US' },
  { code: 'OH', name: 'Ohio', countryCode: 'US' },
  { code: 'OK', name: 'Oklahoma', countryCode: 'US' },
  { code: 'OR', name: 'Oregon', countryCode: 'US' },
  { code: 'PA', name: 'Pennsylvania', countryCode: 'US' },
  { code: 'RI', name: 'Rhode Island', countryCode: 'US' },
  { code: 'SC', name: 'South Carolina', countryCode: 'US' },
  { code: 'SD', name: 'South Dakota', countryCode: 'US' },
  { code: 'TN', name: 'Tennessee', countryCode: 'US' },
  { code: 'TX', name: 'Texas', countryCode: 'US' },
  { code: 'UT', name: 'Utah', countryCode: 'US' },
  { code: 'VT', name: 'Vermont', countryCode: 'US' },
  { code: 'VA', name: 'Virginia', countryCode: 'US' },
  { code: 'WA', name: 'Washington', countryCode: 'US' },
  { code: 'WV', name: 'West Virginia', countryCode: 'US' },
  { code: 'WI', name: 'Wisconsin', countryCode: 'US' },
  { code: 'WY', name: 'Wyoming', countryCode: 'US' }
];

// Map of states by country code
export const STATES_BY_COUNTRY: { [key: string]: State[] } = {
  'US': US_STATES,
  // Add other countries' states here as needed
};
