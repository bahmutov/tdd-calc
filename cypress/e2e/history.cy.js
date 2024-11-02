// Note: using the desktop mode by default to display the history
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
    cy.visit('public/index.html')

    cy.log('**first expression**')
    // enter an expression like "1+2"
    cy.enterExpression('1+2')
    // click the "=" button to compute the result
    cy.contains('#buttons button', '=').click()
    // confirm the history contains the "expression=result" LI element
    cy.get('#history').contains('li', '1+2=3')

    cy.log('**second expression**')
    // clear the current expression
    cy.contains('#buttons button', 'C').click()
    // enter an expression like "3*4"
    cy.enterExpression('3*4')
    // click the "=" button to compute the result
    cy.contains('#buttons button', '=').click()
    // confirm the history contains the "expression=result" LI element
    cy.get('#history').contains('li', '3*4=12')
  })
})
