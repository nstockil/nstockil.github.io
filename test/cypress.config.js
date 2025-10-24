const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'test/cypress/support/e2e.js',
    specPattern: 'test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false, // Disable video for faster local runs
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    videosFolder: 'test/cypress/videos',
    screenshotsFolder: 'test/cypress/screenshots',
    downloadsFolder: 'test/cypress/downloads',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      // Handle axe-core path for accessibility testing
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
    },
  },
})