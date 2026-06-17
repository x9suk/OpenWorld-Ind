# Changelog

## [1.3.0] - 2025-Q1

### Added
- GitHub launch readiness files (README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, LICENSE, CHANGELOG, .env.example)
- GitHub issue templates (bug report, feature request, data correction, content contribution)
- GitHub pull request template
- CI workflow (typecheck, lint, build on Node 20 + pnpm)
- CodeQL security analysis workflow
- Data contribution documentation with validation rules
- Launch checklist for production readiness
- SEO metadata layouts for all route segments

### Fixed
- Unescaped entity lint errors in contribute and docs pages
- Pre-existing TypeScript type compatibility

### Changed
- Upgraded PR template with structured fields
- Enhanced CONTRIBUTING.md with detailed sections

## [1.2.0] - 2025-Q1

### Added
- State detail pages with cinematic hero, culture/economy/attractions sections, tabbed sub-pages
- Monument detail pages with history/architecture/visitor info tabs, gallery, map, share
- City detail pages with overview, attractions, foods, map, travel info
- Contribution system (add place, submit photo, report correction)
- Documentation pages (contributing guide, data format reference, roadmap)
- Server-side metadata for all detail route segments with generateMetadata

### Changed
- Converted state layout from client to server component
- Extracted client layout logic to StateLayoutClient

## [1.1.0] - 2025-Q1

### Added
- GeoJSON state polygon display on map
- Hover highlight and click-to-zoom on state polygons
- Marker clustering for monuments
- Monument popup cards with images and details
- Floating stats overlay on map
- Time Travel slider for historical period exploration
- State image gallery carousel
- Loading skeletons for async content
- Mobile-responsive optimizations
- Dark theme polish

## [1.0.0] - 2025-Q1

### Added
- Initial interactive map with Leaflet
- Monument markers on map
- Navbar with navigation links
- Basic state, monument, and city list pages
- Search page with basic filtering
- History timeline page
- Festivals and food pages
- ErrorState and LoadingSpinner components
- Responsive layout with Footer
