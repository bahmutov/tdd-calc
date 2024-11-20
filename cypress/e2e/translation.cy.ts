describe('Calculator', () => {
  it('shows German translation', () => {
    // the page is in English by default
    // but it reads its "language" from the document's cookie
    // called "language". To switch to German, set the cookie to "de"
    // https://on.cypress.io/setcookie
    cy.setCookie('language', 'de')
    cy.visit('public/index.html')
    // enter an expression that causes an error
    // and press "="
    cy.contains('button', '+').click()
    cy.contains('button', '=').click()
    // confirm the display shows the error message "FEHLER"
    cy.get('#display').should('have.text', 'FEHLER')
    // and after one second the display switches back
    // to the error expression
    cy.log('**switches to + after a 1s pause**')
    cy.get('#display', { timeout: 1100 }).should('have.text', '+')
  })

  it('sets the language using the URL search parameter', () => {
    // visit the page with the search parameter "lang=de"
    // https://on.cypress.io/visit
    //
    // confirm the URL removes the search parameter
    // https://on.cypress.io/location
    // confirm the page sets the "language" cookie to "de"
    // https://on.cypress.io/getcookie
    //
    // confirm the page is in German
    // by pressing the "=" button and checking the display
    // it should be showing the German word "UNGÜLTIGER"
  })
})
