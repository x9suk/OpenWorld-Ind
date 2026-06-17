# Data Contribution Guide

This guide explains how to contribute data to OpenWorld India with correct schemas, validation rules, and examples.

## Table of Contents

- [General Rules](#general-rules)
- [States](#states)
- [Cities](#cities)
- [Monuments](#monuments)
- [Foods](#foods)
- [Festivals](#festivals)
- [Historical Events](#historical-events)
- [Photos](#photos)

## General Rules

### Validation Rules

1. **Provide sources** — All factual data must include links to official or academic sources
2. **camelCase** — Use camelCase for all field names (e.g., `stateId`, `builtBy`, `imageUrl`)
3. **Slug format** — URL-friendly identifiers: `lowercase-with-hyphens` (e.g., `taj-mahal`, `red-fort`)
4. **Image attribution** — Every image must include photographer credit and license information
5. **No copyrighted content** — Only submit your own work or CC-licensed/public domain content
6. **Census data** — Population numbers must reference latest official census data
7. **Widely accepted facts** — Historical dates and facts should be academically accepted

### Source Requirements

Acceptable sources:
- Government census data (e.g., censusindia.gov.in)
- Archaeological Survey of India (asi.nic.in)
- UNESCO World Heritage Centre (whc.unesco.org)
- State tourism department websites
- Academic publications and peer-reviewed journals
- Reputable news archives

---

## States

### Schema

```typescript
interface State {
  id: string;           // Unique identifier (auto-generated)
  name: string;         // Full state name
  slug: string;         // URL-friendly name (e.g., 'tamil-nadu')
  capital: string;      // Capital city name
  description: string;  // Overview of the state
  imageUrl?: string;    // Hero image URL
  population?: number;  // Total population
  area?: number;        // Area in km²
  language?: string[];  // Official languages
  culture?: {
    dance?: string[];
    music?: string[];
    festivals?: string[];
    cuisine?: string[];
  };
  economy?: {
    gdp?: string;
    keyIndustries?: string[];
    agriculture?: string[];
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  attractions?: string[];
  history?: string;
}
```

### Example

```json
{
  "name": "Tamil Nadu",
  "slug": "tamil-nadu",
  "capital": "Chennai",
  "description": "Tamil Nadu is a state in southern India known for its Dravidian-style Hindu temples, colonial architecture, beaches, hill stations, and classical arts.",
  "population": 72147030,
  "area": 130058,
  "language": ["Tamil"],
  "culture": {
    "dance": ["Bharatanatyam"],
    "music": ["Carnatic music"],
    "festivals": ["Pongal", "Thaipusam"],
    "cuisine": ["Dosa", "Idli", "Sambar"]
  },
  "coordinates": { "lat": 11.1271, "lng": 78.6569 }
}
```

---

## Cities

### Schema

```typescript
interface City {
  id: string;
  name: string;
  slug: string;
  stateId: string;           // Must reference an existing state ID
  description: string;       // City overview
  imageUrl?: string;
  population?: number;
  touristAttractions?: string[];
  localFoods?: string[];
  famousPlaces?: string[];
  nearbyDestinations?: string[];
  travelInfo?: string;       // Best time to visit, how to reach, tips
  coordinates?: {
    lat: number;
    lng: number;
  };
}
```

### Example

```json
{
  "name": "Varanasi",
  "slug": "varanasi",
  "stateId": "uttar-pradesh",
  "description": "Varanasi, also known as Kashi or Banaras, is one of the world's oldest continuously inhabited cities and the spiritual capital of India.",
  "population": 1198491,
  "touristAttractions": ["Ganga Aarti", "Dashashwamedh Ghat", "Sarnath"],
  "localFoods": ["Kachori Sabzi", "Banarasi Paan", "Malaiyyo"],
  "coordinates": { "lat": 25.3176, "lng": 82.9739 }
}
```

---

## Monuments

### Schema

```typescript
interface Monument {
  id: string;
  name: string;
  slug: string;
  stateId: string;
  cityId?: string;
  description: string;
  imageUrl?: string;
  history?: string;
  architecture?: string;
  visitorInfo?: string;       // Timings, entry fee, best time
  builtBy?: string;           // Ruler or patron
  builtIn?: string;           // Century or specific year
  style?: string;             // Architectural style
  coordinates?: {
    lat: number;
    lng: number;
  };
  nearbyAttractions?: string[];  // Related sites nearby
  galleryImages?: string[];
}
```

### Example

```json
{
  "name": "Brihadeeswarar Temple",
  "slug": "brihadeeswarar-temple",
  "stateId": "tamil-nadu",
  "cityId": "thanjavur",
  "description": "A UNESCO World Heritage Site, the Brihadeeswarar Temple is a masterpiece of Chola architecture built by Raja Raja Chola I.",
  "builtBy": "Raja Raja Chola I",
  "builtIn": "1010 CE",
  "style": "Dravidian architecture",
  "coordinates": { "lat": 10.7828, "lng": 79.1322 }
}
```

---

## Foods

### Schema

```typescript
interface Food {
  id: string;
  name: string;
  slug: string;
  stateId: string;
  description: string;         // Taste, preparation, cultural significance
  imageUrl?: string;
  category: string;             // e.g., 'main_course', 'dessert', 'snack', 'beverage'
  mealTime?: string;            // e.g., 'breakfast', 'lunch', 'dinner'
  isVegetarian?: boolean;
  keyIngredients?: string[];
  originRegion?: string;        // Specific area within the state
}
```

### Example

```json
{
  "name": "Hyderabadi Biryani",
  "slug": "hyderabadi-biryani",
  "stateId": "telangana",
  "description": "A world-famous fragrant rice dish layered with marinated meat and aromatic spices, cooked in the dum style.",
  "category": "main_course",
  "isVegetarian": false,
  "keyIngredients": ["Basmati rice", "Chicken/Mutton", "Saffron", "Yogurt", "Spices"],
  "originRegion": "Hyderabad"
}
```

---

## Festivals

### Schema

```typescript
interface Festival {
  id: string;
  name: string;
  slug: string;
  description: string;         // Traditions, significance, activities
  imageUrl?: string;
  stateId: string;
  month: string;               // Gregorian or traditional calendar month
  duration?: string;           // e.g., '3 days', '10 days'
  type: string;                // e.g., 'religious', 'harvest', 'cultural', 'national'
  majorAttractions?: string[]; // Key rituals or events
}
```

### Example

```json
{
  "name": "Onam",
  "slug": "onam",
  "stateId": "kerala",
  "description": "The harvest festival of Kerala featuring elaborate flower carpets (Pookalam), grand feasts (Onam Sadya), and snake boat races.",
  "month": "August-September",
  "duration": "10 days",
  "type": "harvest",
  "majorAttractions": ["Onam Sadya", "Vallam Kali (boat race)", "Pookalam"]
}
```

---

## Historical Events

### Schema

```typescript
interface HistoricalEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl?: string;
  year: number;                // Year of the event
  century?: string;            // Optional century reference
  category: string;            // e.g., 'battle', 'construction', 'independence', 'cultural'
  significance: string;        // Why this event matters
  relatedPlaces?: string[];    // Related state/city/monument IDs
  relatedPeople?: string[];    // Historical figures involved
}
```

### Example

```json
{
  "id": "event-004",
  "title": "Construction of Brihadeeswarar Temple",
  "slug": "construction-of-brihadeeswarar-temple",
  "description": "Raja Raja Chola I completed the construction of the Brihadeeswarar Temple in Thanjavur, a masterpiece of Dravidian architecture.",
  "year": 1010,
  "century": "11th century",
  "category": "construction",
  "significance": "The temple is considered one of the greatest achievements of Chola architecture and is a UNESCO World Heritage Site.",
  "relatedPlaces": ["brihadeeswarar-temple", "thanjavur", "tamil-nadu"],
  "relatedPeople": ["Raja Raja Chola I"]
}
```

---

## Photos

### Schema

```typescript
interface Photo {
  id: string;
  url: string;                   // Hosted image URL
  caption: string;               // Description of the image
  photographer: string;          // Name of photographer
  photographerUrl?: string;      // Optional portfolio/social link
  license: string;               // License type (e.g., 'CC-BY-SA 4.0')
  placeId?: string;              // Associated state/city/monument ID
  placeName?: string;            // Name of the place
  dateTaken?: string;            // When the photo was taken
}
```

### Example

```json
{
  "url": "https://example.com/photos/meenakshi-temple-night.jpg",
  "caption": "Meenakshi Temple illuminated at night, Madurai",
  "photographer": "Jane Doe",
  "photographerUrl": "https://unsplash.com/@janedoe",
  "license": "CC-BY-SA 4.0",
  "placeId": "meenakshi-amman-temple",
  "dateTaken": "2024-03-15"
}
```

## Submission Process

### Via GitHub

1. Fork the repository
2. Add or modify data in the appropriate seed file (`apps/api/src/seed.ts` or data files)
3. Run `pnpm typecheck && pnpm build` to verify
4. Submit a Pull Request with your changes and source references

### Via Web Forms

Use the contribution forms at `/contribute` on the website:
- `/contribute/place` — Submit new places
- `/contribute/photo` — Submit photographs
- `/contribute/correction` — Report data errors

### Review Process

1. Your submission is received
2. A community reviewer evaluates accuracy and completeness
3. If approved, it's published with attribution
4. You may be contacted for clarification if needed

## License

All data contributions are licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), ensuring free access for everyone.
