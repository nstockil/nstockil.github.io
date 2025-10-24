describe('Homepage Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.waitForPageLoad()
  })

  it('should load the homepage successfully', () => {
    cy.get('h1').should('be.visible')
    cy.title().should('contain', 'Niamh Stockil')
  })

  it('should have proper navigation links', () => {
    // Check for common navigation elements
    cy.get('nav, .nav, header').should('exist')
    
    // Check that internal links work
    cy.get('a[href*="/about"]').should('exist')
    cy.get('a[href*="/posts"]').should('exist')
    cy.get('a[href*="/workshops"]').should('exist')
  })

  it('should be responsive', () => {
    cy.checkResponsive()
  })

  it('should have proper meta tags for SEO', () => {
    cy.get('head meta[name="description"]').should('exist')
    cy.get('head title').should('not.be.empty')
  })

  // TODO: Re-enable when images are added to the site
  it.skip('should not have broken images', () => {
    cy.get('img').each($img => {
      cy.wrap($img)
        .should('have.prop', 'naturalWidth')
        .and('be.greaterThan', 0)
    })
  })
})