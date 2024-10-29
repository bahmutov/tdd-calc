// we can test complex logic written in a single function
// by testing it in isolation without going through the UI
describe('Calculator appendDot', () => {
  // store the function in a variable
  // so we can use it in each test
  let appendDot

  before(() => {
    // visit the page, which loads the JavaScript
    // and makes all functions available on the "window" object
    // Tip: cy.visit yields the "window" object
    // so you can grab its property "appendDot"
    // and store it in the variable
    // https://on.cypress.io/visit
    // https://on.cypress.io/its
    // https://on.cypress.io/then
  })

  // in each test you can call the "appendDot" function
  // and use Chai assertions to check the result
  // https://glebbahmutov.com/cypress-examples/commands/assertions.html
  it('cannot add a dot if it already has one', () => {})

  it('appends zero at the start of a number', () => {})

  // should add zero automatically to the second number
  // "1+.23" => "1+0.23"
  it('cannot continue an expression with a dot', () => {})
})
