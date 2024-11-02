import { CalculatorPage } from './calculator-po'

describe('History', { viewportWidth: 1000 }, () => {
  it('shows in landscape mode on a larger screen', () => {
    cy.visit('public/index.html')
    // set the current viewport to "iphone-6"
    // https://on.cypress.io/viewport
    cy.viewport('iphone-6')
    // confirm the #history element is not visible
    cy.get('#history').should('not.be.visible')
    // confirm the #right-column element has display: none
    cy.get('#right-column').should('have.css', 'display', 'none')
    // set the current viewport to "macbook-15"
    // https://on.cypress.io/viewport
    cy.viewport('macbook-15')
    // confirm the #history element is visible
    cy.get('#history').should('be.visible')
  })

  it('shows entered expressions and results', () => {
    CalculatorPage.visit()

    cy.log('**first expression**')
    CalculatorPage.compute('1+2', '3')
    // confirm the history contains the "expression=result" LI element
    CalculatorPage.checkHistory('1+2=3')

    cy.log('**second expression**')
    CalculatorPage.clear().compute('3*4', '12')
    // check the history again with two items
    CalculatorPage.checkHistory('1+2=3', '3*4=12')
  })
})
