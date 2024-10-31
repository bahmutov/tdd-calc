// https://www.npmjs.com/package/color-string
// for converting "rgb(...)" string to an array
const colorString = require('color-string')
// https://www.npmjs.com/package/color-convert
// for converting arrays between color spaces
const colorConvert = require('color-convert')

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

  it('changes the button background on hover', () => {
    cy.visit('public/index.html')
    // take an example button, like "5"
    // https://on.cypress.io/contains
    cy.contains('#buttons button', '5')
      // save the button element for later under an alias "exampleButton"
      // https://on.cypress.io/as
      .as('exampleButton')
      // it should have "background-color" CSS property
      .should('have.css', 'background-color')
      // use a sanity assertion to print the current value
      // in the Cypress Command Log column
      .should('be.a', 'string')
      // parse the color string into an object with "r", "g", "b" properties
      .then(parseColor)
      // and pass that object to the "cy.then" callback function
      .then((background) => {
        // get the aliased button element using the "exampleButton" alias
        // https://on.cypress.io/get
        cy.get('@exampleButton')
          // hover over the element using the custom commands from
          // https://github.com/dmtrKovalenko/cypress-real-events
          .realHover()
          // get the new background color and parse it
          .should('have.css', 'background-color')
          .should('be.a', 'string')
          .then(parseColor)
          // and compare the new color with the original color
          // each channel should be higher than the original
          // because the color is getting lighter
          .should((hoverBackground) => {
            // each color channel should be higher than the original
            expect(hoverBackground.r, 'red').to.be.gt(background.r)
            expect(hoverBackground.g, 'green').to.be.gt(background.g)
            expect(hoverBackground.b, 'blue').to.be.gt(background.b)
          })
      })
  })

  it('changes the operator button background to a lighter color', () => {
    cy.visit('public/index.html')
    // grab an example operator button, like "+"
    // and save it under an alias "exampleButton"
    // https://on.cypress.io/contains
    // https://on.cypress.io/as
    cy.contains('#buttons button', '+')
      .as('exampleButton')
      // get the current background color
      // and parse:
      //  - the color string "rgb(...)" to an array
      //    using the color-string package
      // - then convert the RGB array to HSL array
      //    using the color-convert package
      // and grab its 3 number: the lightness value
      // it should be a number
      .should('have.css', 'background-color')
      .should('be.a', 'string')
      .then(colorString.get.rgb)
      .then(colorConvert.rgb.hsl)
      .its(2) // get the lightness channel
      .should('be.a', 'number')
      // pass the starting lightness to "cy.then" callback
      .then((lightness) => {
        // get the button again using the alias
        // https://on.cypress.io/get
        cy.get('@exampleButton')
          // and hover over it using "cy.realHover"
          // https://github.com/dmtrKovalenko/cypress-real-events
          .realHover()
          // get the background color again
          // and extract the lightness value
          .should('have.css', 'background-color')
          .should('be.a', 'string')
          .then(colorString.get.rgb)
          .then(colorConvert.rgb.hsl)
          .its(2)
          .should('be.a', 'number')
          // it should be higher than the starting lightness
          .and('be.gt', lightness)
      })
  })

  it('has a distinctive active style', () => {
    cy.visit('public/index.html')
    cy.contains('#buttons button', '5')
      .as('exampleButton')
      .realClick()
  })
})
