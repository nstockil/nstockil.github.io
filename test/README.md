# Testing Directory

This directory contains all testing assets for the Jekyll portfolio site.

## Structure

```
test/
├── cypress.config.js           # Cypress E2E testing configuration
├── .axerc.json                 # Accessibility testing rules and config
├── cypress/
│   ├── support/
│   │   ├── e2e.js              # Global Cypress setup and imports
│   │   └── commands.js         # Custom Cypress commands
│   ├── e2e/
│   │   ├── homepage.cy.js      # Homepage tests
│   │   ├── navigation.cy.js    # Navigation and routing tests
│   │   ├── blog.cy.js          # Blog functionality tests
│   │   └── accessibility.cy.js # Accessibility compliance tests
│   ├── videos/                 # Test run videos (gitignored)
│   ├── screenshots/            # Failure screenshots (gitignored)
│   └── downloads/              # Downloaded files during tests (gitignored)
└── reports/                    # Accessibility test reports (gitignored)
```

## Running Tests

From the project root:

```bash
# Run all tests
npm test

# Run only Cypress tests
npm run test:cypress

# Run Cypress interactively
npm run test:cypress:open

# Run only accessibility tests
npm run test:accessibility
```

## Configuration

- **Cypress Config**: `test/cypress.config.js` - Test runner settings, baseUrl, timeouts
- **Axe Config**: `test/.axerc.json` - Accessibility rules and output settings

## Adding Tests

1. **E2E Tests**: Add `.cy.js` files to `test/cypress/e2e/`
2. **Custom Commands**: Add reusable functions to `test/cypress/support/commands.js`
3. **Page Objects**: Create page objects in `test/cypress/support/pages/` (create directory as needed)

## Test Types

- **Functional**: User flows, navigation, form interactions
- **Visual**: Responsive design, layout validation
- **Accessibility**: WCAG compliance, keyboard navigation, screen reader support
- **Performance**: Link checking, image loading, external resources