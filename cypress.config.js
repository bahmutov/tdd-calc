const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    // configure files that cypress-watch-and-reload will watch
    env: {
      // list the files and file patterns to watch
    },
    viewportHeight: 900,
    viewportWidth: 500,
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
      // https://github.com/bahmutov/cypress-watch-and-reload
    },
  },
})
