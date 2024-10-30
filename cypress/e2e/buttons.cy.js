describe('Calculator', () => {
  it('has all necessary buttons', () => {
    cy.visit('public/index.html')
    // these are the button labels we expect to have
    // arranged in a grid (to be implemented later)
    const labels = [
      // first row
      '+',
      '7',
      '8',
      '9',
      // second row
      '-',
      '5',
      '4',
      '6',
      // third row
      '*',
      '1',
      '2',
      '3',
      // fourth row
      '/',
      '0',
      '.',
      '=',
      // clear button
      'C',
    ]
    // confirm there is the correct number of buttons
    // https://on.cypress.io/get
    // https://on.cypress.io/should
    cy.get('#buttons button').should('have.length', labels.length)
    // check that there is a button element with the matching label
    // https://on.cypress.io/contains
    cy.get('#buttons').within(() => {
      labels.forEach((label) => {
        cy.contains('button', label)
      })
    })
  })

  it('clears the display', () => {
    cy.visit('public/index.html')
    // enter a few digits like this expression
    const expression = '123'
    cy.enterExpression(expression)
    // confirm the display is showing the entered expression
    cy.get('#display').should('have.text', expression)
    // press the button "C"
    cy.contains('button', 'C').click()
    // confirm the display is cleared
    cy.get('#display').should('have.text', '')
  })

  it('calls the clearDisplay global function', () => {
    cy.visit('public/index.html')
    cy.contains('4').click()
    cy.get('#display').should('have.text', '4')
    // spy on the global function "clearDisplay"
    // Tip: every global function is attached to the "window" object
    // https://on.cypress.io/window
    // https://on.cypress.io/spy
    // give the spy an alias "clear"
    // https://on.cypress.io/as
    // Hint: https://glebbahmutov.com/cypress-examples/commands/spies-stubs-clocks.html
    cy.window().then((win) => {
      cy.spy(win, 'clearDisplay').as('clear')
    })
    // perform the action through the UI
    cy.contains('button', 'C').click()
    // confirm the spy "clear" was called once
    cy.get('@clear').should('have.been.calledOnce')
  })

  it('has round buttons', () => {
    cy.visit('public/index.html')
    // confirm the first button is 100px by 100px
    cy.log('**width**')
    // first check the width CSS property
    // using the "have.css" assertion
    // https://on.cypress.io/get
    // https://on.cypress.io/first
    cy.get('#buttons button')
      .first()
      // note: the computed layout might be different
      // and not be exactly 100px
      // You probably need to confirm "99.99991px"
      // to a number first, then use "closeTo" assertion
      // https://glebbahmutov.com/cypress-examples/recipes/same-height.html
      .should('have.css', 'width')
      .then(parseFloat)
      .should('be.closeTo', 100, 0.1)
    // next, check the height CSS property
    cy.log('**height**')
    cy.get('#buttons button')
      .first()
      .should('have.css', 'height')
      .then(parseFloat)
      .should('be.closeTo', 100, 0.1)
    // confirm the buttons are round
    // by checking their border radius
    cy.log('**border radius**')
    cy.get('#buttons button')
      .first()
      .should('have.css', 'border-radius', '50px')
  })

  it('has no margin on the body', () => {
    cy.visit('public/index.html')
    // confirm the body has no margin
    // https://on.cypress.io/get + "have.css"
    cy.get('body').should('have.css', 'margin', '0px')
  })

  it('has dark background', () => {
    cy.visit('public/index.html')
    // confirm the calculator element has a dark background
    // https://on.cypress.io/get + "have.css"
    cy.get('#calculator')
      .should('have.css', 'background-color', 'rgb(38, 38, 38)')
      // and has 15px border radius
      .and('have.css', 'border-radius', '15px')
  })

  /**
   * parse the color string "rgb(255, 160, 25)"
   * into an object {r: 255, g: 160, b: 25}
   */
  function parseColor(color) {
    const [r, g, b] = color.match(/\d+/g).map(Number)
    return { r, g, b }
  }

  it('changes the button background on hover', () => {
    cy.visit('public/index.html')
    // take an example button, like "5"
    // https://on.cypress.io/contains
    // save the button element for later under an alias "exampleButton"
    // https://on.cypress.io/as
    // it should have "background-color" CSS property
    // use a sanity assertion to print the current value
    // in the Cypress Command Log column
    // parse the color string into an object with "r", "g", "b" properties
    //
    // and pass that object to the "cy.then" callback function
    // get the aliased button element using the "exampleButton" alias
    // https://on.cypress.io/get
    //
    // hover over the element using the custom commands from
    // https://github.com/dmtrKovalenko/cypress-real-events
    //
    // get the new background color and parse it
    //
    // and compare the new color with the original color
    // each channel should be higher than the original
    // because the color is getting lighter
    // each color channel should be higher than the original
  })

  it('has orange operator buttons', () => {
    cy.visit('public/index.html')
    // a color object representing orange red/green/blue channels
    const orange = {
      r: 255,
      g: 160,
      b: 25,
    }
    const operators = ['+', '-', '*', '/', 'C']
    // each operator button should have the class name "operator-btn"
    // https://on.cypress.io/contains
    // https://glebbahmutov.com/cypress-examples/recipes/css-examples.html
    // and the computed background color should be close to orange
    // for each chanel within +-2 units
    // Tip: "have.css" yields a string that you can parse
    // and pass the RGB object into a "should(callback)" to check
    operators.forEach((operator) => {
      cy.contains('#buttons button', operator)
        .should('have.class', 'operator-btn')
        .and('have.css', 'background-color')
        .then(parseColor)
        .should((color) => {
          expect(color.r, 'red').to.be.closeTo(orange.r, 2)
          expect(color.g, 'green').to.be.closeTo(orange.g, 2)
          expect(color.b, 'blue').to.be.closeTo(orange.b, 2)
        })
    })
  })
})
