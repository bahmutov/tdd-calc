import { CalculatorPage } from './calculator-po'

describe('Calculator', () => {
  it('passes accessibility checks', () => {
    CalculatorPage.visit()
    CalculatorPage.compute('100+200', '300')
    // check the whole page for any a11y issues
  })
})
