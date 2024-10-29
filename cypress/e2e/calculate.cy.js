describe('Calculator', () => {
  it('can add two numbers', () => {
    cy.visit('public/index.html')
    cy.enterExpression('1+2')
    cy.get('#display').should('have.text', '1+2')
    // click the "=" button
    // https://on.cypress.io/contains
    // https://on.cypress.io/click
    //
    // display should have text "3"
    // https://on.cypress.io/get
    // https://on.cypress.io/should
  })
})
