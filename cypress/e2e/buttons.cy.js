/// <reference types="cypress" />

describe('Calculator', () => {
  it('has all necessary buttons', () => {
    cy.visit('public/index.html')
    // these are the button labels we expect to have
    // arranged in a grid (to be implemented later)
    const labels = [
      // first row
      '+',
      '7',
      '8',
      '9',
      // second row
      '-',
      '5',
      '4',
      '6',
      // third row
      '*',
      '1',
      '2',
      '3',
      // fourth row
      '/',
      '0',
      '.',
      '=',
      // clear button
      'C',
    ]
    // confirm there is the correct number of buttons
    // https://on.cypress.io/get
    // https://on.cypress.io/should
    cy.get('#buttons button').should('have.length', labels.length)
    // check that there is a button element with the matching label
    // https://on.cypress.io/contains
    cy.get('#buttons').within(() => {
      labels.forEach((label) => {
        cy.contains('button', label)
      })
    })
  })

  it('clears the display', () => {
    cy.visit('public/index.html')
    // enter a few digits like this expression
    const expression = '123'
    // replace the custom code with the call to
    // a custom Cypress command
    // cy.enterExpression(expression)
    // defined in the "cypress/support/e2e.js"
    // expression.split('').forEach((char) => {
    //   cy.contains('button', char).click()
    // })
    cy.enterExpression(expression)

    // confirm the display is showing the entered expression
    cy.get('#display').should('have.text', expression)
    // press the button "C"
    cy.contains('button', 'C').click()
    // confirm the display is cleared
    cy.get('#display').should('have.text', '')
  })

  it('calls the clearDisplay global function', () => {
    cy.visit('public/index.html')
    cy.contains('4').click()
    cy.get('#display').should('have.text', '4')
    // spy on the global function "clearDisplay"
    // Tip: every global function is attached to the "window" object
    // https://on.cypress.io/window
    // https://on.cypress.io/spy
    // give the spy an alias "clear"
    // https://on.cypress.io/as
    // Hint: https://glebbahmutov.com/cypress-examples/commands/spies-stubs-clocks.html
    cy.window().then((win) => {
      cy.spy(win, 'clearDisplay').as('clear')
    })
    // perform the action through the UI
    cy.contains('button', 'C').click()
    // confirm the spy "clear" was called once
    cy.get('@clear').should('have.been.calledOnce')
  })
})
