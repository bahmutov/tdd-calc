const { defineConfig } = require('cypress')
// https://github.com/sclavijosuero/wick-a11y
const addAccessibilityTasks = require('wick-a11y/accessibility-tasks')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    // configure files that cypress-watch-and-reload will watch
    env: {
      // list the files and file patterns to watch
      'cypress-watch-and-reload': {
        watch: ['public/*'],
      },
      // see the code coverage configuration options
      // https://github.com/bahmutov/cypress-code-coverage
      coverage: {
        // intercept and instrument application's scripts
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
      addAccessibilityTasks(on)

      // https://github.com/bahmutov/cypress-code-coverage
      require('@bahmutov/cypress-code-coverage/plugin')(on, config)

      // https://github.com/bahmutov/cypress-watch-and-reload
      require('cypress-watch-and-reload/plugins')(on, config)

      // IMPORTANT to return the config object
      return config
    },
  },
})
