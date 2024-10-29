/// <reference types="cypress" />

describe('Calculator', () => {
  it('shows entered numbers', () => {
    cy.visit('public/index.html')
    // type number "123" by clicking individual digits
    // https://on.cypress.io/contains
    // https://on.cypress.io/click
    cy.contains('button', '1').click()
    cy.contains('button', '2').click()
    cy.contains('button', '3').click()
    // confirm the display element has the text "123"
    // https://on.cypress.io/contins
    // or you can get the element and check its text
    // https://on.cypress.io/should
    cy.get('#display').should('have.text', '123')
  })

  it('shows entered expression', () => {
    cy.visit('public/index.html')
    // type expression "123+456"
    // by clicking individual digits and operators
    const expression = '123+456'
    // split the expression into individual characters
    // and click the corresponding button
    expression.split('').forEach((char) => {
      cy.contains('button', char).click()
    })
    // confirm the display shows the whole expression
    cy.get('#display').should('have.text', expression)
  })

  it('is visible when empty', () => {
    cy.visit('public/index.html')
    // confirm the display element has no text
    // but is still visible
    // https://on.cypress.io/get
    // https://glebbahmutov.com/cypress-examples/recipes/is-visible.html
    //
    // enter an expression
    //
    // and confirm the display font size is 80px
    // https://glebbahmutov.com/cypress-examples/recipes/check-style.html
  })
})
