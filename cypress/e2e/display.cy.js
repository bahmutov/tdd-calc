/// <reference types="cypress" />

describe('Calculator', () => {
  it('shows entered numbers', () => {
    cy.visit('public/index.html')
    // type number "123" by clicking individual digits
    // https://on.cypress.io/contains
    // https://on.cypress.io/click
    //
    // confirm the display element has the text "123"
    // https://on.cypress.io/contins
    // or you can get the element and check its text
    // https://on.cypress.io/should
  })
})
