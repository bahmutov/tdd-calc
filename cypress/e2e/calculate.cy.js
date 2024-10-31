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
    cy.enterExpression('1++2')
    cy.get('#display').should('have.text', '1++2')
    cy.contains('#buttons button', '=').click()
    // confirm the display shows "ERROR"
    cy.get('#display').should('have.text', 'ERROR')
  })

  it('does not try to evaluate non-numeric expressions', () => {
    cy.visit('public/index.html')
    // our "malicious" expression to be evaluated
    const expression = 'console.log("hello")'
    // before evaluating the above expression
    // set up a spy on the console.log method
    // of the application's window object
    // https://on.cypress.io/window
    // https://on.cypress.io/spy
    cy.window()
      .its('console')
      .then((console) => {
        // give the spy an alias "consoleLog"
        cy.spy(console, 'log').as('consoleLog')
      })
    // "enter" a non-numeric expression
    // into the display element by setting its text
    // https://on.cypress.io/get
    // https://on.cypress.io/invoke
    // Tip: cy.get yields a jQuery object
    // which has method "text"
    // https://api.jquery.com/text/
    cy.get('#display').invoke('text', expression)
    // click the "=" button
    cy.contains('#buttons button', '=').click()
    // confirm the "console.log" method was NOT called
    // https://on.cypress.io/get
    // Tip: use short timeout to avoid waiting for the default 4 seconds
    cy.get('@consoleLog', { timeout: 100 }).should(
      'not.have.been.called',
    )
    // confirm the display shows "INVALID"
    cy.get('#display').should('have.text', 'INVALID')
  })

  it('removes ERROR message after one second and shows the invalid expression', () => {
    cy.visit('public/index.html')
    // enter an invalid expression
    // into the calculator
    // click the "=" button
    // confirm the display shows "ERROR"
    //
    // the display shows the original expression after about 1 second
  })
})
