// shared Cypress commands and plugins
// load the cypress-watch-and-reload plugin
require('cypress-watch-and-reload/support')

// load the custom commands like "cy.realHover"
// https://github.com/dmtrKovalenko/cypress-real-events
require('cypress-real-events/support')

// https://github.com/bahmutov/cypress-code-coverage
require('@bahmutov/cypress-code-coverage/support')

// create a new Cypress custom command
// to enter an expression into the calculator
// by clicking individual buttons
// https://on.cypress.io/custom-commands
Cypress.Commands.add('enterExpression', (expression) => {
  expression.split('').forEach((char) => {
    cy.contains('#buttons button', char).click()
  })
})
