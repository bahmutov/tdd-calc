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
    cy.get('#display').should('have.text', '').and('be.visible')
    // enter an expression
    cy.enterExpression('1+2')
    // and confirm the display font size is 80px
    // https://glebbahmutov.com/cypress-examples/recipes/check-style.html
    cy.get('#display').should('have.css', 'fontSize', '80px')
  })

  it('has a grid of buttons', () => {
    cy.visit('public/index.html')
    // confirm the calculator has 17 buttons
    //
    // how would you check that the buttons are arranged
    // in a grid? The grid should have 5 rows like this:
    // "+" 7 8 9
    // "-" 4 5 6
    // "*" 1 2 3
    // "/" 0 . =
    // "C"
    // let's confirm the first row has the same "top offset" prop
    const firstRow = ['+', '7', '8', '9']
    const secondRow = ['-', '4', '5', '6']
    // get the first button's "top offset"
    // https://on.cypress.io/contains
    // https://glebbahmutov.com/cypress-examples/recipes/layout-shift.html
    // pass the "top offset" to the next "then" callback
    // https://on.cypress.io/then
    // confirm each button in the first row has the same "top offset"
    //
    // confirm the second row has larger "top offset"
    // than the offset of the first button
    //
    // similarly to the first row,
    // confirm the first column has the same "left offset"
  })
})
