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
})
