describe('Calculator', () => {
  it('can add two numbers', () => {
    cy.visit('public/index.html')
    cy.enterExpression('1+2')
    cy.get('#display').should('have.text', '1+2')
    // click the "=" button
    // https://on.cypress.io/contains
    // https://on.cypress.io/click
    cy.contains('#buttons button', '=').click()
    // display should have text "3"
    // https://on.cypress.io/get
    // https://on.cypress.io/should
    cy.get('#display').should('have.text', '3')
  })

  it('shows an error for invalid expressions', () => {
    cy.visit('public/index.html')
    // enter an invalid numerical expression
    // like "1++2" and press "="
    // confirm the display shows "ERROR"
  })
})
