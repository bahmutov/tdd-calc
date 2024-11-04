export const CalculatorPage = {
  visit() {
    cy.visit('public/index.html')
  },

  /**
   * @param {string} expression to enter into the calculator, like "1+2+3"
   */
  enterExpression(expression) {
    cy.enterExpression(expression)
  },

  /**
   * @param {string} expression to be evaluated, like "1+2"
   * @param {string} expectedResult the expected result, like "3"
   */
  compute(expression, expectedResult) {
    cy.enterExpression(expression)
    cy.contains('#buttons button', '=', { log: false }).click({
      log: false,
    })
    cy.get('#display').should('have.text', expectedResult)
  },

  clear() {
    cy.log('**clearing the calculator**')
    cy.contains('#buttons button', 'C', { log: false }).click({
      log: false,
    })
    return this
  },

  /**
   * @param {string[]} items list of history items to check
   */
  checkHistory(...items) {
    cy.log(`**checking history with ${items.length} items**`)
    cy.get('#history li', { log: false }).should(
      'have.length',
      items.length,
    )
    items.forEach((item, k) => {
      cy.get('#history li', { log: false })
        .eq(k, { log: false })
        .should('have.text', item)
    })
  },
}
