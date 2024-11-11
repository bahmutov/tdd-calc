describe('Calculator', () => {
  it('loads CSS and JS resources', () => {
    // set up a network spy on "styles.css"
    // give the spy an alias "styles"
    // https://on.cypress.io/intercept
    // https://on.cypress.io/as
    cy.intercept('styles.css').as('styles')
    // set up a network spy on "app.js"
    // give the spy an alias "app"
    cy.intercept('app.js').as('app')
    cy.visit('public/index.html')
    // wait for the "styles.css" to be loaded
    // https://on.cypress.io/wait
    // confirm the server response code is either 200 or 304
    // https://on.cypress.io/its
    // https://glebbahmutov.com/cypress-examples/commands/assertions.html
    cy.wait('@styles')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304])
    // confirm the application javascript loads
    // by waiting on the "app.js" resource
    // and confirming its response status code
    cy.wait('@app')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304])
  })
})
