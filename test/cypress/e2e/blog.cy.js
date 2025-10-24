describe('Blog Posts Tests', () => {
  beforeEach(() => {
    cy.visit('/posts')
    cy.waitForPageLoad()
  })

  it('should display blog posts index', () => {
    cy.get('h1, h2').should('contain.text', 'Posts')
  })

  it('should have post links that work', () => {
    // Check if there are any blog posts
    cy.get('body').then($body => {
      if ($body.find('a[href*="/updates/"]').length > 0) {
        cy.get('a[href*="/updates/"]').first().then($link => {
          const href = $link.prop('href')
          cy.visit(href)
          cy.waitForPageLoad()
          cy.get('article, .post-content, main').should('exist')
        })
      } else {
        // If no posts yet, just verify the page structure
        cy.get('main, .content').should('exist')
      }
    })
  })

  it('should have proper post structure when posts exist', () => {
    cy.get('body').then($body => {
      if ($body.find('a[href*="/updates/"]').length > 0) {
        cy.get('a[href*="/updates/"]').first().click()
        cy.get('h1, .post-title').should('exist')
        cy.get('.post-date, time, .date').should('exist')
      }
    })
  })

  it('should have RSS feed link', () => {
    cy.get('head link[type="application/rss+xml"], head link[type="application/atom+xml"], a[href*="feed.xml"]')
      .should('exist')
  })
})