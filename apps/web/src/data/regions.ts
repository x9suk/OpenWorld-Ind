export type Region = 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast';

export interface RegionInfo {
  id: Region;
  label: string;
  states: string[];
}

export const REGIONS: RegionInfo[] = [
  { id: 'north', label: 'North India', states: ['Jammu and Kashmir', 'Ladakh', 'Himachal Pradesh', 'Punjab', 'Haryana', 'Uttarakhand', 'Delhi', 'Chandigarh'] },
  { id: 'south', label: 'South India', states: ['Tamil Nadu', 'Karnataka', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Puducherry', 'Lakshadweep'] },
  { id: 'east', label: 'East India', states: ['West Bengal', 'Odisha', 'Bihar', 'Jharkhand', 'Andaman and Nicobar Islands'] },
  { id: 'west', label: 'West India', states: ['Rajasthan', 'Gujarat', 'Maharashtra', 'Goa', 'Daman and Diu'] },
  { id: 'central', label: 'Central India', states: ['Madhya Pradesh', 'Chhattisgarh', 'Uttar Pradesh'] },
  { id: 'northeast', label: 'Northeast India', states: ['Arunachal Pradesh', 'Assam', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura'] },
];

export function getRegionForState(stateName: string): Region | null {
  for (const region of REGIONS) {
    if (region.states.includes(stateName)) return region.id;
  }
  return null;
}

export function getRegionLabel(id: Region): string {
  return REGIONS.find((r) => r.id === id)?.label || id;
}
