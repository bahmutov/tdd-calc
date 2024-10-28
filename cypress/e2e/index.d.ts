/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    /**
     * Enters the given expression character by character
     * @param expression string
     * @example
     *  cy.enterExpression('1+2')
     * @see https://glebbahmutov.com/blog/writing-custom-cypress-command/
     */
    enterExpression(expression: string): void
  }
}
