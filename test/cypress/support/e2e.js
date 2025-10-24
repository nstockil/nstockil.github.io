// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Import cypress-axe for accessibility testing
import 'cypress-axe'

// Import cypress-plugin-tab for keyboard navigation testing
import 'cypress-plugin-tab'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Add command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.window().should('have.property', 'document')
})

// Override injectAxe command to use correct axe-core path
Cypress.Commands.overwrite('injectAxe', () => {
  cy.readFile('node_modules/axe-core/axe.min.js').then((source) => {
    return cy.window({ log: false }).then((window) => {
      window.eval(source);
    });
  });
})