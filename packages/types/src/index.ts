export interface State {
  id: string;
  name: string;
  capital: string;
  population: number;
  area: number;
  languages: string[];
  formationDate: string;
  districtsCount: number;
  majorCities: string[];
  touristAttractions: string[];
  famousFoods: string[];
  festivals: string[];
  cultureDescription: string;
  economyOverview: string;
  imageUrl: string;
  statehoodDay: string;
  website: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface District {
  id: string;
  stateId: string;
  name: string;
  headquarters: string;
  population: number;
  area: number;
  literacyRate: number;
}

export interface City {
  id: string;
  stateId: string;
  districtId: string;
  name: string;
  population: number;
  description: string;
  famousPlaces: string[];
  touristAttractions: string[];
  nearbyDestinations: string[];
  localFoods: string[];
  travelInfo: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
}

export interface Monument {
  id: string;
  name: string;
  stateId: string;
  cityId: string;
  description: string;
  history: string;
  constructionDetails: string;
  architecture: string;
  visitorInfo: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  imageUrls: string[];
  builtBy: string;
  builtIn: string;
  style: string;
  nearbyAttractions: string[];
  entryFee: string;
  timings: string;
  bestTimeToVisit: string;
}

export interface Food {
  id: string;
  name: string;
  stateId: string;
  category: string;
  description: string;
  history: string;
  ingredients: string[];
  regionalVariations: string[];
  isVegetarian: boolean;
  spiceLevel: string;
  imageUrl: string;
}

export interface Festival {
  id: string;
  name: string;
  stateId: string;
  description: string;
  month: string;
  dates: string;
  traditions: string[];
  isNationalHoliday: boolean;
  type: string;
  imageUrl: string;
  photoUrls: string[];
}

export interface HistoricalEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  year: string;
  period: 'ancient' | 'medieval' | 'colonial' | 'independence' | 'modern';
  category: string;
  personalities: string[];
  locations: string[];
  imageUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'user' | 'editor' | 'admin';
  createdAt: string;
}

export interface Contribution {
  id: string;
  userId: string;
  type: string;
  data: Record<string, any>;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  contributorId: string;
  entityType: string;
  entityId: string;
  approved: boolean;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  questions: QuizQuestion[];
  timeLimit: number;
}

export interface DayPlan {
  day: number;
  title: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

export interface Itinerary {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'heritage' | 'food' | 'weekend' | 'adventure';
  stateId: string;
  dayPlans: DayPlan[];
  totalCost: string;
  imageUrl: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  criteria: string;
}

export interface SearchResult {
  type: string;
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  relevance: number;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
  page?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface MapViewport {
  center: [number, number];
  zoom: number;
}
