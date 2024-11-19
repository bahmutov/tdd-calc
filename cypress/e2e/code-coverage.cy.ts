import { CalculatorPage } from './calculator-po'

it('collects code coverage on the fly', () => {
  cy.visit('public/index.html')
  // after instrumenting the coverage should be collected in the window object
  // under window.__coverage__ key
  // There should be two keys: one for the main script and one for the spec
  cy.window()
    .should('have.property', '__coverage__')
    .should('have.keys', [
      'public/app.js',
      'public/db.js',
      'public/utils.js',
    ])

  // compute an expression and see the increased code coverage
  CalculatorPage.compute('1+2.1', '3.1')
})
