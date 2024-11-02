describe('History', () => {
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
})
