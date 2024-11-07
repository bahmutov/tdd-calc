// https://github.com/sclavijosuero/wick-a11y
import 'wick-a11y'
import { CalculatorPage } from './calculator-po'

// increase the default command timeout to 15 seconds
// to ensure that the a11y report has enough time to be generated
describe('Calculator', { defaultCommandTimeout: 15_000 }, () => {
  it('passes accessibility checks', () => {
    CalculatorPage.visit()
    // use longer text because by default the a11y plugin
    // needs the text to be at least 2 characters
    CalculatorPage.compute('100+200', '300')
    // check accessibility after the computation
    cy.checkAccessibility()
  })

  it('passes accessibility checks (short text)', () => {
    CalculatorPage.visit()
    CalculatorPage.compute('2-1', '1')
    // check accessibility after the computation
    // include the options object to ignore the length of the text
    // cy.checkAccessibility(context, options)
    // where context is null to check the entire page
    // and options object lists options per rule:
    // checks: {
    //   'color-contrast': {
    //     options: {
    //       ignoreLength: true,
    //     },
    //   },
    // },
    cy.checkAccessibility()
  })
})
