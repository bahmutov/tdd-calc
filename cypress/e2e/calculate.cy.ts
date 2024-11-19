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
    cy.enterExpression('1++2')
    // click the "=" button
    cy.contains('#buttons button', '=').click()
    // confirm the display shows "ERROR"
    cy.get('#display').should('have.text', 'ERROR')
    // the display shows the original expression after about 1 second
    cy.get('#display', { timeout: 1100 }).should('have.text', '1++2')
  })

  it('remembers the calculated expression', () => {
    cy.visit('public/index.html')

    cy.log('**remembers the expression**')
    // enter an expression like "1+2"
    cy.enterExpression('1+2')
    cy.get('#display').should('have.text', '1+2')
    // reload the page
    // https://on.cypress.io/reload
    cy.reload()
    // and confirm the display shows the entered expression
    cy.get('#display').should('have.text', '1+2')

    cy.log('**remembers the result**')
    // click the "=" button to calculate the result
    cy.contains('#buttons button', '=').click()
    cy.get('#display').should('have.text', '3')
    // reload the page
    cy.reload()
    // and confirm the display shows the calculated result
    cy.get('#display').should('have.text', '3')
  })

  it('stores its data in localStorage', () => {
    cy.visit('public/index.html')
    cy.enterExpression('1+2')
    // access the application's local storage object
    // via the "window.localStorage" property
    // https://on.cypress.io/window
    // https://on.cypress.io/its
    cy.window()
      .its('localStorage')
      // get the "calculator_data" item from the local storage
      // https://on.cypress.io/invoke
      .invoke('getItem', 'calculator_data')
      // it should be a string
      .should('be.a', 'string')
      // parse the string into an object
      .then((s) => JSON.parse(s as unknown as string))
      // and confirm the entire object has the expected data
      .should('deep.equal', {
        version: 'v2',
        expression: '1+2',
        history: [],
      })
  })

  it('does not use global calculate', () => {
    cy.visit('public/index.html')
    // the "=" button should not have an "onclick" attribute
    cy.contains('#buttons button', '=').should(
      'not.have.attr',
      'onclick',
    )
    // the window object should not have a "calculate" property
    cy.window().should('not.have.property', 'calculate')
    // confirm the calculator still calculates
    cy.enterExpression('1+2')
    cy.contains('#buttons button', '=').click()
    cy.get('#display').should('have.text', '3')
  })

  it('does not use global clearDisplay', () => {
    cy.visit('public/index.html')
    // the "C" button should not have an "onclick" attribute
    cy.contains('#buttons button', 'C').should(
      'not.have.attr',
      'onclick',
    )
    // the window object should not have a "clearDisplay" property
    cy.window().should('not.have.property', 'clearDisplay')
    // confirm the clear display button still works
    cy.enterExpression('1+2')
    cy.contains('#buttons button', 'C').click()
    cy.get('#display').should('have.text', '')
  })

  it('does not use global enterDigit', () => {
    cy.visit('public/index.html')
    // the "1" button should not have an "onclick" attribute
    cy.contains('#buttons button', '1').should(
      'not.have.attr',
      'onclick',
    )
    // the window object should not have an "enterDigit" property
    cy.window().should('not.have.property', 'enterDigit')
    // confirm the calculator still enters entire expressions
    // with every digit and operator present
    cy.enterExpression('1234567890')
    cy.get('#display').should('have.text', '1234567890')
    cy.contains('#buttons button', 'C').click()
    cy.enterExpression('1.2-+*/')
    cy.get('#display').should('have.text', '1.2-+*/')
  })
})