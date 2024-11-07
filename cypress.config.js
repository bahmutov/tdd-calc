const { defineConfig } = require('cypress')

// load the accessibility plugin

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    // configure files that cypress-watch-and-reload will watch
    env: {
      // list the files and file patterns to watch
      'cypress-watch-and-reload': {
        watch: ['public/*'],
      },
    },
    viewportHeight: 900,
    viewportWidth: 500,
    fixturesFolder: false,
    // enable running all specs together
    // https://on.cypress.io/experiments
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment

      // add accessibility tasks

      // https://github.com/bahmutov/cypress-watch-and-reload
      return require('cypress-watch-and-reload/plugins')(on, config)
    },
  },
})
