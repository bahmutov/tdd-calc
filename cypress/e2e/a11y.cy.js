// https://github.com/sclavijosuero/wick-a11y
import 'wick-a11y'
import { CalculatorPage } from './calculator-po'

describe('Calculator', () => {
  it('passes accessibility checks', () => {
    CalculatorPage.visit()
    CalculatorPage.compute('1+2', '3')
    cy.checkAccessibility()
  })
})
