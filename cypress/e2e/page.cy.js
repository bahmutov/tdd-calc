// tell your code editor to load global "cypress" type definitions
// so it can provide code completion and type checking
/// <reference types="cypress" />

describe('Calculator', () => {
  it('loads', () => {
    // visit the HTML page (could be a simple file)
    // https://on.cypress.io/visit
    cy.visit('public/index.html')
    // confirm the page title is "TDD Calculator"
    // https://on.cypress.io/title
    cy.title().should('equal', 'TDD Calculator')
  })

  it('has the expected elements', () => {
    cy.visit('public/index.html')
    // confirm there is an element with id "calculator"
    // and inside there are elements with id "display" and "buttons"
    // https://on.cypress.io/get
    // https://on.cypress.io/find
    // https://on.cypress.io/within
    // one solution
    cy.get('#calculator').within(() => {
      cy.get('#display')
      cy.get('#buttons')
    })
  })
})
