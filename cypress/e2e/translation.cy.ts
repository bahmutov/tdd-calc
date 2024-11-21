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
    cy.visit('public/index.html?lang=de')
    // confirm the URL removes the search parameter
    // https://on.cypress.io/location
    cy.location('search').should('equal', '')
    // confirm the page sets the "language" cookie to "de"
    // https://on.cypress.io/getcookie
    cy.getCookie('language').its('value').should('equal', 'de')
    // confirm the page is in German
    // by pressing the "=" button and checking the display
    // it should be showing the German word "UNGÜLTIGER"
    cy.contains('button', '=').click()
    cy.get('#display').should('have.text', 'UNGÜLTIGER')
  })

  it('uses language button to switch the language', () => {
    cy.visit('public/index.html')
    // the language button should show the "🇬🇧" emoji
    // and have attribute "current-language" set to "EN"
    cy.contains('button', '🇬🇧')
      .should('have.attr', 'current-language', 'EN')
      // click on the language button
      .click()
    // the window should eventually reload and the app
    // should set the cookie "language" to "de"
    cy.getCookie('language').its('value').should('equal', 'de')
    // the language button should now show the "🇩🇪" emoji
    // and have the attribute "current-language" set to "DE"
    cy.contains('button', '🇩🇪')
      .should('be.visible')
      .and('have.attr', 'current-language', 'DE')
      // click on the language button
      .click()
    // the cookie language should now be "en"
    cy.getCookie('language').its('value').should('equal', 'en')
  })

  it('reloads the page twice on language switch', () => {
    cy.visit('public/index.html')
    // keep track of how many times the page has loaded
    // by listening to the "window:load" event
    // Tip: see "Catalog of Events" in the docs
    // https://on.cypress.io/api
    //
    // click on the "🇬🇧" button
    // https://on.cypress.io/contains
    // https://on.cypress.io/click
    //
    // confirm the "🇩🇪" button is visible
    // and then confirm the page has loaded twice
    // by looking at your counter variable
  })
})
