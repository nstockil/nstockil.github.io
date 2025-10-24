# UI Testing Setup for Niamh Stockil Portfolio

This project includes comprehensive UI testing with Cypress and accessibility testing with axe-core.

## Prerequisites

1. **Ruby & Jekyll** (already set up)
   - Bundle install: `bundle install`
   - Build site: `bundle exec jekyll build`

2. **Node.js & npm** (for testing tools)
   - Install dependencies: `npm install`

## Available Test Scripts

### Local Development
```bash
# Install all dependencies
npm install

# Build Jekyll site and start local server
npm run build:serve

# Run Cypress tests interactively
npm run test:cypress:open

# Build site and run all tests
npm run test
```

### Individual Test Types

```bash
# Run only Cypress e2e tests
npm run test:cypress

# Run only accessibility tests (requires server running)
npm run test:accessibility

# Build and serve site locally
npm run build:serve
```

### CI/CD (GitHub Actions)

The `.github/workflows/ui-tests.yml` workflow runs automatically on push and includes:

1. **Jekyll Build** - Builds the static site
2. **Accessibility Tests** - Runs axe-core against all pages
3. **Cypress E2E Tests** - Tests user flows and functionality

## Test Structure

All testing assets are organized in the `test/` directory:

```
test/
├── cypress.config.js           # Cypress configuration
├── .axerc.json                # Axe accessibility rules
├── cypress/
│   ├── support/
│   │   ├── e2e.js             # Global test setup
│   │   └── commands.js        # Custom commands
│   └── e2e/
│       ├── homepage.cy.js     # Homepage functionality and SEO
│       ├── navigation.cy.js   # Site navigation and routing
│       ├── blog.cy.js         # Blog posts and RSS feeds
│       └── accessibility.cy.js # Accessibility compliance
└── reports/                   # Generated test reports
```

### Cypress Tests (`test/cypress/e2e/`)
- `homepage.cy.js` - Homepage functionality and SEO
- `navigation.cy.js` - Site navigation and routing
- `blog.cy.js` - Blog posts and RSS feeds
- `accessibility.cy.js` - Accessibility compliance

### Accessibility Tests
- Automated via axe-core CLI
- WCAG 2.1 AA compliance
- Color contrast, heading structure, alt text
- Configured in `test/.axerc.json`

## Configuration Files

- `test/cypress.config.js` - Cypress configuration
- `package.json` - Dependencies and scripts
- `test/.axerc.json` - Axe accessibility rules
- `test/cypress/support/` - Custom commands and setup

## Local Testing Workflow

1. Build the Jekyll site: `npm run build`
2. Start local server: `npm run serve` (in separate terminal)
3. Run tests: `npm run test:cypress` or `npm run test:accessibility`
4. For interactive testing: `npm run test:cypress:open`

## Adding New Tests

### Cypress Tests
Add new test files to `test/cypress/e2e/` following the naming pattern `*.cy.js`

### Custom Commands
Add reusable test functions to `test/cypress/support/commands.js`

### Page Objects
Consider creating page objects in `test/cypress/support/pages/` for complex interactions

## Troubleshooting

### Common Issues
- **Port 3000 in use**: Change port in `test/cypress.config.js` and npm scripts
- **Jekyll build errors**: Run `bundle exec jekyll doctor`
- **Cypress installation**: Run `npm run cy:install`

### Windows-Specific
- Server stopping: Uses `taskkill` command
- Timeout commands: Uses Windows `timeout` instead of `sleep`

## Integration with VS Code

Recommended extensions:
- Cypress Helper
- axe DevTools
- Jekyll snippets