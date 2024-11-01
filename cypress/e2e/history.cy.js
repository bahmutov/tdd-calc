describe('History', () => {
  it('shows in landscape mode on a larger screen', () => {
    cy.visit('public/index.html')
    // set the current viewport to "iphone-6"
    // https://on.cypress.io/viewport
    //
    // confirm the #history element is not visible
    // confirm the #right-column element has display: none
    //
    // set the current viewport to "macbook-15"
    // https://on.cypress.io/viewport
    // confirm the #history element is visible
  })
})
