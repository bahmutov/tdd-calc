import { CalculatorPage } from './calculator-po'

it('collects code coverage on the fly', () => {
  cy.visit('public/index.html')
  // after instrumenting the coverage should be collected in the window object
  // under window.__coverage__ key
  // There should be two keys: one for the main script and one for the spec

  // compute an expression and see the increased code coverage
})
