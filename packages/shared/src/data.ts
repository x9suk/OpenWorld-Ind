import { STATE_COLORS } from './constants';
import { calculateDistance } from './utils';

export const stateSlugs: Record<string, string> = {
  'Andhra Pradesh': 'andhra-pradesh',
  'Arunachal Pradesh': 'arunachal-pradesh',
  'Assam': 'assam',
  'Bihar': 'bihar',
  'Chhattisgarh': 'chhattisgarh',
  'Goa': 'goa',
  'Gujarat': 'gujarat',
  'Haryana': 'haryana',
  'Himachal Pradesh': 'himachal-pradesh',
  'Jharkhand': 'jharkhand',
  'Karnataka': 'karnataka',
  'Kerala': 'kerala',
  'Madhya Pradesh': 'madhya-pradesh',
  'Maharashtra': 'maharashtra',
  'Manipur': 'manipur',
  'Meghalaya': 'meghalaya',
  'Mizoram': 'mizoram',
  'Nagaland': 'nagaland',
  'Odisha': 'odisha',
  'Punjab': 'punjab',
  'Rajasthan': 'rajasthan',
  'Sikkim': 'sikkim',
  'Tamil Nadu': 'tamil-nadu',
  'Telangana': 'telangana',
  'Tripura': 'tripura',
  'Uttar Pradesh': 'uttar-pradesh',
  'Uttarakhand': 'uttarakhand',
  'West Bengal': 'west-bengal',
};

export function getStateBySlug(slug: string): string | null {
  const entry = Object.entries(stateSlugs).find(([, s]) => s === slug);
  return entry ? entry[0] : null;
}

export function getStateColor(stateName: string): string {
  return STATE_COLORS[stateName] || '#CCCCCC';
}

export function getStateFromCoordinates(lat: number, lng: number): string | null {
  let closest: string | null = null;
  let minDist = Infinity;
  for (const [name, [slat, slng]] of Object.entries(stateCoordinates) as [string, [number, number]][]) {
    const d = calculateDistance(lat, lng, slat, slng);
    if (d < minDist) {
      minDist = d;
      closest = name;
    }
  }
  return closest;
}

export const stateCoordinates: Record<string, [number, number]> = {
  'Andhra Pradesh': [15.9129, 79.7400],
  'Arunachal Pradesh': [28.2180, 94.7278],
  'Assam': [26.2006, 92.9376],
  'Bihar': [25.0961, 85.3131],
  'Chhattisgarh': [21.2787, 81.8661],
  'Goa': [15.4909, 73.8278],
  'Gujarat': [22.2587, 71.1924],
  'Haryana': [29.0588, 76.0856],
  'Himachal Pradesh': [31.1048, 77.1734],
  'Jharkhand': [23.6102, 85.2799],
  'Karnataka': [15.3173, 75.7139],
  'Kerala': [10.8505, 76.2711],
  'Madhya Pradesh': [22.9734, 78.6569],
  'Maharashtra': [19.7515, 75.7139],
  'Manipur': [24.6637, 93.9063],
  'Meghalaya': [25.4670, 91.3662],
  'Mizoram': [23.1645, 92.9376],
  'Nagaland': [26.1584, 94.5624],
  'Odisha': [20.9517, 85.0985],
  'Punjab': [31.1471, 75.3412],
  'Rajasthan': [27.0238, 74.2179],
  'Sikkim': [27.5330, 88.5122],
  'Tamil Nadu': [11.1271, 78.6569],
  'Telangana': [18.1124, 79.0193],
  'Tripura': [23.9408, 91.9882],
  'Uttar Pradesh': [26.8467, 80.9462],
  'Uttarakhand': [30.0668, 79.0193],
  'West Bengal': [22.9868, 87.8550],
};
