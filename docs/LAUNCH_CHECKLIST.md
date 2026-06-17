# Launch Checklist

Use this checklist before launching OpenWorld India to production.

## Local Checks

- [ ] `pnpm install` completes without errors
- [ ] `pnpm dev` starts and site is accessible at localhost:3000
- [ ] All pages render without console errors
- [ ] Map tiles load correctly
- [ ] Dark mode toggle works
- [ ] All links navigate to correct pages
- [ ] Responsive layout works on mobile (375px), tablet (768px), desktop (1280px)
- [ ] Back/forward browser navigation works
- [ ] 404 page handles unknown routes

## Build Checks

- [ ] `pnpm typecheck` passes with zero errors
- [ ] `pnpm lint` passes with zero errors (warnings reviewed)
- [ ] `pnpm build` completes successfully
- [ ] Production build serves correctly
- [ ] No missing dependencies in build output
- [ ] Build size is within acceptable limits

## SEO Checks

- [ ] All pages have unique `<title>` metadata
- [ ] All pages have meta descriptions
- [ ] OG tags are present on all pages (og:title, og:description, og:image, og:url)
- [ ] Canonical URLs are set
- [ ] robots.txt is configured
- [ ] sitemap.xml is generated
- [ ] No broken internal links
- [ ] Heading hierarchy is correct (h1 -> h2 -> h3)
- [ ] Image alt attributes are provided

## Accessibility Checks

- [ ] Keyboard navigation works on all interactive elements
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader can navigate major sections
- [ ] All form inputs have labels
- [ ] ARIA labels on interactive icons
- [ ] Reduced motion respects prefers-reduced-motion
- [ ] Skip-to-content link is available

## GitHub Repository Checks

- [ ] README.md is complete with project info, screenshots, and setup instructions
- [ ] CONTRIBUTING.md provides clear contribution guidelines
- [ ] CODE_OF_CONDUCT.md is added
- [ ] SECURITY.md defines vulnerability reporting process
- [ ] LICENSE file is present (MIT)
- [ ] CHANGELOG.md documents release history
- [ ] .env.example shows required environment variables
- [ ] .gitignore excludes sensitive and build files
- [ ] Issue templates exist (bug, feature, data correction, content contribution)
- [ ] Pull request template exists
- [ ] CI workflow is configured and passing
- [ ] CodeQL workflow is configured
- [ ] Repository description and topics are set
- [ ] GitHub Pages or deployment is configured

## Deployment Checks

- [ ] Environment variables are configured in deployment platform
- [ ] Build command succeeds in CI (pnpm install -> pnpm build)
- [ ] Database is seeded with initial data
- [ ] Asset URLs use correct base path
- [ ] API endpoints respond correctly
- [ ] CORS is configured if needed
- [ ] Rate limiting is considered for API routes
- [ ] Error monitoring is configured
- [ ] Analytics are configured
- [ ] SSL certificate is valid
- [ ] Custom domain is configured (if applicable)
- [ ] CDN caching is configured for static assets
- [ ] Performance budget is set and measured

## Post-Launch

- [ ] Monitor error logs for first 24 hours
- [ ] Check Google Search Console for indexing issues
- [ ] Review Core Web Vitals in Lighthouse
- [ ] Gather user feedback
- [ ] Plan next iteration based on feedback
- [ ] Update CHANGELOG with release notes
- [ ] Tag release in GitHub

## Performance Checklist

- [ ] Lighthouse score >= 80 on all categories (desktop)
- [ ] Lighthouse score >= 60 on all categories (mobile)
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] First Input Delay (FID) < 100ms
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Images are optimized (WebP format considered)
- [ ] JavaScript bundles are code-split
- [ ] Fonts are optimized (woff2, subset if needed)
- [ ] Server response time < 200ms
