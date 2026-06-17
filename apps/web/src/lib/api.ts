import type { State, Monument, Food, Festival, HistoricalEvent, City, SearchResult } from '@openworld/types';
import { mockStates, mockMonuments, mockFoods, mockFestivals, mockEvents, mockCities, buildSearchIndex } from '@/data/mockData';

interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page?: number;
}

interface ApiSingleResponse<T> {
  success: boolean;
  data: T;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export const api = {
  states: {
    list: (page = 1, limit = 50): Promise<ApiListResponse<State>> => {
      const start = (page - 1) * limit;
      const data = mockStates.slice(start, start + limit);
      return Promise.resolve({ success: true, data, total: mockStates.length, page });
    },
    get: (slug: string): Promise<ApiSingleResponse<State>> => {
      const data = mockStates.find((s) => slugify(s.name) === slug) || mockStates[0];
      return Promise.resolve({ success: true, data });
    },
    cities: (slug: string): Promise<ApiListResponse<City>> => {
      const state = mockStates.find((s) => slugify(s.name) === slug);
      const data = state ? mockCities.filter((c) => c.stateId === state.id) : [];
      return Promise.resolve({ success: true, data, total: data.length });
    },
    monuments: (slug: string): Promise<ApiListResponse<Monument>> => {
      const state = mockStates.find((s) => slugify(s.name) === slug);
      const data = state ? mockMonuments.filter((m) => m.stateId === state.id) : [];
      return Promise.resolve({ success: true, data, total: data.length });
    },
    foods: (slug: string): Promise<ApiListResponse<Food>> => {
      const state = mockStates.find((s) => slugify(s.name) === slug);
      const data = state ? mockFoods.filter((f) => f.stateId === state.id) : [];
      return Promise.resolve({ success: true, data, total: data.length });
    },
    festivals: (slug: string): Promise<ApiListResponse<Festival>> => {
      const state = mockStates.find((s) => slugify(s.name) === slug);
      const data = state ? mockFestivals.filter((fe) => fe.stateId === state.id) : [];
      return Promise.resolve({ success: true, data, total: data.length });
    },
  },
  cities: {
    list: (page = 1, limit = 50, _stateId?: string): Promise<ApiListResponse<City>> => {
      const start = (page - 1) * limit;
      const data = mockCities.slice(start, start + limit);
      return Promise.resolve({ success: true, data, total: mockCities.length, page });
    },
    get: (slug: string): Promise<ApiSingleResponse<City>> => {
      const data = mockCities.find((c) => slugify(c.name) === slug) || mockCities[0];
      return Promise.resolve({ success: true, data });
    },
  },
  monuments: {
    list: (page = 1, limit = 50): Promise<ApiListResponse<Monument>> => {
      const start = (page - 1) * limit;
      const data = mockMonuments.slice(start, start + limit);
      return Promise.resolve({ success: true, data, total: mockMonuments.length, page });
    },
    get: (slug: string): Promise<ApiSingleResponse<Monument>> => {
      const data = mockMonuments.find((m) => slugify(m.name) === slug) || mockMonuments[0];
      return Promise.resolve({ success: true, data });
    },
  },
  foods: {
    list: (page = 1, limit = 50): Promise<ApiListResponse<Food>> => {
      const start = (page - 1) * limit;
      const data = mockFoods.slice(start, start + limit);
      return Promise.resolve({ success: true, data, total: mockFoods.length, page });
    },
    get: (slug: string): Promise<ApiSingleResponse<Food>> => {
      const data = mockFoods.find((f) => slugify(f.name) === slug) || mockFoods[0];
      return Promise.resolve({ success: true, data });
    },
  },
  festivals: {
    list: (page = 1, limit = 50): Promise<ApiListResponse<Festival>> => {
      const start = (page - 1) * limit;
      const data = mockFestivals.slice(start, start + limit);
      return Promise.resolve({ success: true, data, total: mockFestivals.length, page });
    },
    get: (slug: string): Promise<ApiSingleResponse<Festival>> => {
      const data = mockFestivals.find((fe) => slugify(fe.name) === slug) || mockFestivals[0];
      return Promise.resolve({ success: true, data });
    },
  },
  history: {
    list: (page = 1, limit = 50): Promise<ApiListResponse<HistoricalEvent>> => {
      const start = (page - 1) * limit;
      const data = mockEvents.slice(start, start + limit);
      return Promise.resolve({ success: true, data, total: mockEvents.length, page });
    },
    get: (id: string): Promise<ApiSingleResponse<HistoricalEvent>> => {
      const data = mockEvents.find((e) => e.id === id) || mockEvents[0];
      return Promise.resolve({ success: true, data });
    },
    period: (period: string): Promise<ApiListResponse<HistoricalEvent>> => {
      const data = mockEvents.filter((e) => e.period === period);
      return Promise.resolve({ success: true, data, total: data.length });
    },
    timeline: (): Promise<ApiListResponse<HistoricalEvent>> => {
      const sorted = [...mockEvents].sort((a, b) => parseInt(a.year) - parseInt(b.year));
      return Promise.resolve({ success: true, data: sorted, total: sorted.length });
    },
  },
  search: (q: string): Promise<ApiListResponse<SearchResult>> => {
    const query = q.toLowerCase();
    const index = buildSearchIndex();
    const data = index.filter(
      (r) => r.title.toLowerCase().includes(query) || r.description.toLowerCase().includes(query)
    ).slice(0, 20);
    return Promise.resolve({ success: true, data, total: data.length });
  },
  quiz: {
    list: () => {
      const quizzes = [
        { id: '1', title: 'Indian Geography', description: 'Test your knowledge of India geography, states, and landmarks.', difficulty: 'medium', category: 'Geography', questionCount: 5, timeLimit: 300 },
        { id: '2', title: 'Indian History', description: 'From ancient civilizations to modern India.', difficulty: 'hard', category: 'History', questionCount: 5, timeLimit: 600 },
        { id: '3', title: 'Indian Culture', description: 'Festivals, food, dance, and traditions.', difficulty: 'easy', category: 'Culture', questionCount: 5, timeLimit: 300 },
        { id: '4', title: 'Monuments of India', description: 'Identify famous monuments and their history.', difficulty: 'medium', category: 'Monuments', questionCount: 5, timeLimit: 300 },
      ];
      return Promise.resolve({ success: true, data: quizzes, total: quizzes.length });
    },
    get: (_id: string) => {
      const q = {
        id: '1', title: 'Indian Geography', description: 'Test your knowledge of India geography, states, and landmarks.',
        difficulty: 'medium', timeLimit: 300, questionCount: 5,
        questions: [
          { id: 'q1', text: 'Which is the largest state in India by area?', options: ['Maharashtra', 'Rajasthan', 'Madhya Pradesh', 'Uttar Pradesh'], correctIndex: 1, explanation: 'Rajasthan is the largest state in India by area at 342,239 km².' },
          { id: 'q2', text: 'Which river is the longest in India?', options: ['Yamuna', 'Brahmaputra', 'Ganges', 'Godavari'], correctIndex: 2, explanation: 'The Ganges (Ganga) is the longest river in India at 2,525 km.' },
          { id: 'q3', text: 'Which state has the longest coastline in India?', options: ['Tamil Nadu', 'Maharashtra', 'Gujarat', 'Andhra Pradesh'], correctIndex: 2, explanation: 'Gujarat has the longest coastline in India at 1,600 km.' },
          { id: 'q4', text: 'What is the capital of Karnataka?', options: ['Mysuru', 'Hubli', 'Bengaluru', 'Mangaluru'], correctIndex: 2, explanation: 'Bengaluru is the capital of Karnataka.' },
          { id: 'q5', text: 'Which is the highest mountain peak in India?', options: ['Kanchenjunga', 'Nanda Devi', 'K2', 'Mount Everest'], correctIndex: 0, explanation: 'Kanchenjunga (8,586 m) is the highest peak in India, located in Sikkim.' },
        ],
      };
      return Promise.resolve({ success: true, data: q });
    },
  },
  itineraries: {
    list: () => {
      const its = [
        { id: '1', title: 'Golden Triangle Tour', description: 'Explore Delhi, Agra, and Jaipur in 5 days.', duration: 5, type: 'heritage', state: 'Delhi', totalCost: 25000, days: [] },
        { id: '2', title: 'Kerala Backwaters', description: 'Relax on a houseboat cruise through Kerala backwaters.', duration: 7, type: 'weekend', state: 'Kerala', totalCost: 35000, days: [] },
      ];
      return Promise.resolve({ success: true, data: its, total: its.length });
    },
    get: (_id: string) => {
      const it = {
        id: '1', title: 'Golden Triangle Tour', description: 'Explore the three most iconic cities of North India: Delhi, Agra, and Jaipur.',
        type: 'heritage', duration: 5, totalCost: 25000, state: 'Delhi',
        latitude: 28.7041, longitude: 77.1025,
        days: [
          { day: 1, title: 'Arrive in Delhi', activities: ['Visit India Gate', 'Explore Qutub Minar', 'Drive through Rajpath', 'Evening at Connaught Place'], meals: ['Breakfast at hotel', 'Lunch at Karims', 'Dinner at Bukhara'], accommodation: 'Hotel in Central Delhi' },
          { day: 2, title: 'Delhi to Agra', activities: ['Drive to Agra (3 hrs)', 'Visit Taj Mahal at sunrise', 'Explore Agra Fort', 'Evening at Mehtab Bagh'], meals: ['Breakfast at hotel', 'Lunch at Peshawri', 'Dinner at hotel'], accommodation: 'Hotel near Taj Mahal' },
          { day: 3, title: 'Agra to Jaipur', activities: ['Visit Fatehpur Sikri en route', 'Arrive in Jaipur', 'Evening at Hawa Mahal', 'Explore local bazaar'], meals: ['Breakfast at hotel', 'Lunch at highway dhaba', 'Dinner at Chhappan Bhog'], accommodation: 'Hotel in Jaipur' },
          { day: 4, title: 'Explore Jaipur', activities: ['Visit Amber Fort', 'Explore City Palace', 'Visit Jantar Mantar', 'Shopping in Johari Bazaar'], meals: ['Breakfast at hotel', 'Lunch at Rajasthan Rasoi', 'Dinner at hotel'], accommodation: 'Hotel in Jaipur' },
          { day: 5, title: 'Departure', activities: ['Breakfast at hotel', 'Visit Birla Temple', 'Transfer to airport'], meals: ['Breakfast at hotel'], accommodation: 'Departure' },
        ],
      };
      return Promise.resolve({ success: true, data: it });
    },
  },
};
