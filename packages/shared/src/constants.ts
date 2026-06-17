export const INDIA_CENTER: [number, number] = [20.5937, 78.9629];
export const INDIA_DEFAULT_ZOOM = 5;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
export const STATES_COUNT = 28;
export const UNION_TERRITORIES_COUNT = 8;
export const TOTAL_DISTRICTS = 766;

export const STATE_COLORS: Record<string, string> = {
  'Andhra Pradesh': '#FF6B6B',
  'Arunachal Pradesh': '#4ECDC4',
  'Assam': '#45B7D1',
  'Bihar': '#96CEB4',
  'Chhattisgarh': '#FFEAA7',
  'Goa': '#DDA0DD',
  'Gujarat': '#98D8C8',
  'Haryana': '#F7DC6F',
  'Himachal Pradesh': '#BB8FCE',
  'Jharkhand': '#85C1E9',
  'Karnataka': '#F8C471',
  'Kerala': '#82E0AA',
  'Madhya Pradesh': '#F1948A',
  'Maharashtra': '#73C6B6',
  'Manipur': '#D7BDE2',
  'Meghalaya': '#A3E4D7',
  'Mizoram': '#FADBD8',
  'Nagaland': '#AED6F1',
  'Odisha': '#F9E79F',
  'Punjab': '#A9CCE3',
  'Rajasthan': '#F5B7B1',
  'Sikkim': '#A9DFBF',
  'Tamil Nadu': '#FAD7A0',
  'Telangana': '#D5F5E3',
  'Tripura': '#E8DAEF',
  'Uttar Pradesh': '#D4E6F1',
  'Uttarakhand': '#FCF3CF',
  'West Bengal': '#D5DBDB',
};

export const PERIODS = [
  { id: 'ancient', label: 'Ancient India', range: '3300 BCE – 750 CE', color: '#D4A574' },
  { id: 'medieval', label: 'Medieval India', range: '750 CE – 1526 CE', color: '#8B4513' },
  { id: 'colonial', label: 'Colonial India', range: '1526 CE – 1947 CE', color: '#4A6741' },
  { id: 'independence', label: 'Independence Movement', range: '1857 CE – 1947 CE', color: '#FF9933' },
  { id: 'modern', label: 'Modern India', range: '1947 CE – Present', color: '#138808' },
];

export const CATEGORIES = ['state', 'city', 'monument', 'food', 'festival', 'historical_event'] as const;
