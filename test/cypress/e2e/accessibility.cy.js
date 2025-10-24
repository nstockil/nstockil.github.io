describe('Accessibility Tests', () => {
  const pages = [
    { name: 'Homepage', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Posts', url: '/posts' },
    { name: 'Workshops', url: '/workshops' }
  ]

  pages.forEach(page => {
    it(`should be accessible on ${page.name}`, () => {
      cy.visit(page.url)
      cy.waitForPageLoad()
      
      // Inject axe-core for accessibility testing
      cy.injectAxe()
      
      // Run accessibility check with custom rules
      cy.checkA11y(null, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21aa']
        }
      })
    })
  })

  it('should have proper heading structure', () => {
    pages.forEach(page => {
      cy.visit(page.url)
      cy.waitForPageLoad()
      
      // Check for h1 tag (should have exactly one)
      cy.get('h1').should('have.length.at.least', 1)
      cy.get('h1').should('have.length.at.most', 1)
      
      // Check heading hierarchy
      cy.get('h1, h2, h3, h4, h5, h6').then($headings => {
        const headingLevels = Array.from($headings).map(h => parseInt(h.tagName.charAt(1)))
        
        // Verify heading levels don't skip (e.g., h1 -> h3)
        for (let i = 1; i < headingLevels.length; i++) {
          const current = headingLevels[i]
          const previous = headingLevels[i - 1]
          expect(current - previous).to.be.at.most(1)
        }
      })
    })
  })

  // TODO: Re-enable when images are added to the site
  it.skip('should have proper alt text for images', () => {
    cy.visit('/')
    cy.waitForPageLoad()
    
    cy.get('img').each($img => {
      cy.wrap($img).should('have.attr', 'alt')
      
      // Check that alt text is meaningful (not empty or just filename)
      cy.wrap($img).then($el => {
        const alt = $el.attr('alt')
        const src = $el.attr('src')
        
        expect(alt).to.not.be.empty
        if (src) {
          const filename = src.split('/').pop().split('.')[0]
          expect(alt.toLowerCase()).to.not.equal(filename.toLowerCase())
        }
      })
    })
  })

  it('should have sufficient color contrast', () => {
    cy.visit('/')
    cy.waitForPageLoad()
    cy.injectAxe()
    
    cy.checkA11y(null, {
      runOnly: {
        type: 'rule',
        values: ['color-contrast']
      }
    })
  })

  it('should be keyboard navigable', () => {
    cy.visit('/')
    cy.waitForPageLoad()
    
    // Test tab navigation through interactive elements
    cy.get('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
      .first()
      .focus()
      .tab()
    
    // Verify focus is visible
    cy.focused().should('be.visible')
  })
})