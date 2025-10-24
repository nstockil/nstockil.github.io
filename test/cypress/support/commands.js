// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Example custom command for login (if needed later)
// Cypress.Commands.add('login', (email, password) => { ... })

// Custom command to check responsive behavior
Cypress.Commands.add('checkResponsive', () => {
  const viewports = [
    { width: 320, height: 568 },   // Mobile
    { width: 768, height: 1024 },  // Tablet
    { width: 1280, height: 720 },  // Desktop
  ]
  
  viewports.forEach(viewport => {
    cy.viewport(viewport.width, viewport.height)
    cy.get('body').should('be.visible')
    // Add viewport-specific assertions here
  })
})

// Command to check external links
Cypress.Commands.add('checkExternalLinks', () => {
  cy.get('a[href^="http"]').each($link => {
    const href = $link.prop('href')
    cy.request({
      url: href,
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.be.oneOf([200, 301, 302, 403])
    })
  })
})