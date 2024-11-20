describe('Calculator', () => {
  it('shows German translation', () => {
    // the page is in English by default
    // but it reads its "language" from the document's cookie
    // called "language". To switch to German, set the cookie to "de"
    // https://on.cypress.io/setcookie
    cy.visit('public/index.html')
    // enter an expression that causes an error
    // and press "="
    // confirm the display shows the error message "FEHLER"
    // and after one second the display switches back
    // to the error expression
  })
})
