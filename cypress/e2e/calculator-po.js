export const CalculatorPage = {
  visit() {
    cy.visit('public/index.html')
  },

  /**
   * @param {string} expression to enter into the calculator, like "1+2+3"
   */
  enterExpression(expression) {},

  /**
   * @param {string} expression to be evaluated, like "1+2"
   * @param {string} expectedResult the expected result, like "3"
   */
  compute(expression, expectedResult) {},

  clear() {},

  /**
   * @param {string[]} items list of history items to check
   */
  checkHistory(...items) {},
}
