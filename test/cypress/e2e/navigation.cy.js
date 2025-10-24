describe('Navigation Tests', () => {
  const pages = [
    { name: 'About', url: '/about' },
    { name: 'Posts', url: '/posts' },
    { name: 'Workshops', url: '/workshops' },
    { name: 'Big Life Fix', url: '/blf' }
  ]

  pages.forEach(page => {
    it(`should navigate to ${page.name} page`, () => {
      cy.visit('/')
      cy.get(`a[href*="${page.url}"]`).first().click()
      cy.url().should('include', page.url)
      cy.get('h1, h2').should('be.visible')
    })

    it(`should load ${page.name} page directly`, () => {
      cy.visit(page.url)
      cy.waitForPageLoad()
      cy.get('body').should('contain.text', page.name === 'Big Life Fix' ? 'Fix' : page.name)
    })
  })

  it('should handle 404 pages gracefully', () => {
    cy.visit('/non-existent-page', { failOnStatusCode: false })
    cy.get('body').should('contain.text', '404')
  })

  it('should maintain consistent header/footer across pages', () => {
    pages.forEach(page => {
      cy.visit(page.url)
      cy.get('header, nav, .header').should('exist')
      cy.get('footer, .footer').should('exist')
    })
  })
})