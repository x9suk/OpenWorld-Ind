import { DatabaseSync } from 'node:sqlite';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const dataDir = resolve(__dirname || '.', '..', 'data');
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

const dbPath = resolve(dataDir, 'openworld.db');
const db = new DatabaseSync(dbPath);

db.exec('PRAGMA journal_mode=WAL');
db.exec('PRAGMA foreign_keys=ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS states (
    id TEXT PRIMARY KEY, name TEXT UNIQUE, capital TEXT, population INTEGER, area REAL,
    languages TEXT, formation_date TEXT, districts_count INTEGER, major_cities TEXT,
    tourist_attractions TEXT, famous_foods TEXT, festivals TEXT, culture_description TEXT,
    economy_overview TEXT, image_url TEXT, statehood_day TEXT, website TEXT,
    latitude REAL, longitude REAL, slug TEXT UNIQUE
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS districts (
    id TEXT PRIMARY KEY, state_id TEXT, name TEXT, headquarters TEXT, population INTEGER,
    area REAL, literacy_rate REAL
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS cities (
    id TEXT PRIMARY KEY, state_id TEXT, district_id TEXT, name TEXT, population INTEGER,
    description TEXT, famous_places TEXT, tourist_attractions TEXT, nearby_destinations TEXT,
    local_foods TEXT, travel_info TEXT, latitude REAL, longitude REAL, image_url TEXT, slug TEXT
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS monuments (
    id TEXT PRIMARY KEY, name TEXT, state_id TEXT, city_id TEXT, description TEXT,
    history TEXT, construction_details TEXT, architecture TEXT, visitor_info TEXT,
    latitude REAL, longitude REAL, image_url TEXT, image_urls TEXT, built_by TEXT,
    built_in TEXT, style TEXT, nearby_attractions TEXT, entry_fee TEXT, timings TEXT,
    best_time_to_visit TEXT, slug TEXT
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS foods (
    id TEXT PRIMARY KEY, name TEXT, state_id TEXT, category TEXT, description TEXT,
    history TEXT, ingredients TEXT, regional_variations TEXT, is_vegetarian INTEGER,
    spice_level TEXT, image_url TEXT, slug TEXT
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS festivals (
    id TEXT PRIMARY KEY, name TEXT, state_id TEXT, description TEXT, month TEXT,
    dates TEXT, traditions TEXT, is_national_holiday INTEGER, type TEXT, image_url TEXT, slug TEXT
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS historical_events (
    id TEXT PRIMARY KEY, title TEXT, description TEXT, date TEXT, year INTEGER,
    period TEXT, category TEXT, personalities TEXT, locations TEXT, image_url TEXT
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, name TEXT, email TEXT UNIQUE, avatar_url TEXT,
    role TEXT DEFAULT 'user', created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS contributions (
    id TEXT PRIMARY KEY, user_id TEXT, type TEXT, data TEXT, status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS photos (
    id TEXT PRIMARY KEY, url TEXT, caption TEXT, contributor_id TEXT,
    entity_type TEXT, entity_id TEXT, approved INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS quizzes (
    id TEXT PRIMARY KEY, title TEXT, description TEXT, difficulty TEXT,
    category TEXT, questions TEXT, time_limit INTEGER, image_url TEXT
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS itineraries (
    id TEXT PRIMARY KEY, title TEXT, description TEXT, duration TEXT,
    type TEXT, state_id TEXT, day_plans TEXT, total_cost TEXT, image_url TEXT
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS achievements (
    id TEXT PRIMARY KEY, name TEXT, description TEXT, icon_url TEXT, criteria TEXT
  )
`);

export default db;
