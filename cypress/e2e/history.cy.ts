import { CalculatorPage } from './calculator-po'

describe('History', { viewportWidth: 1000 }, () => {
  it('shows in landscape mode on a larger screen', () => {
    cy.visit('public/index.html')
    // set the current viewport to "iphone-6"
    // https://on.cypress.io/viewport
    cy.viewport('iphone-6')
    // confirm the #history element is not visible
    cy.get('#history').should('not.be.visible')
    // confirm the #right-column element has display: none
    cy.get('#right-column').should('have.css', 'display', 'none')
    // set the current viewport to "macbook-15"
    // https://on.cypress.io/viewport
    cy.viewport('macbook-15')
    // confirm the #history element is visible
    cy.get('#history').should('be.visible')
  })

  it('shows entered expressions and results', () => {
    CalculatorPage.visit()

    cy.log('**first expression**')
    CalculatorPage.compute('1+2', '3')
    // confirm the history contains the "expression=result" LI element
    CalculatorPage.checkHistory('1+2=3')

    cy.log('**second expression**')
    CalculatorPage.clear().compute('3*4', '12')
    // check the history again with two items
    CalculatorPage.checkHistory('1+2=3', '3*4=12')
  })

  it('stores the history in the local storage', () => {
    CalculatorPage.visit()

    CalculatorPage.compute('1+2', '3').clear().compute('3*4', '12')
    CalculatorPage.checkHistory('1+2=3', '3*4=12')

    // check the local storage entry "calculator_data"
    // version v2
    // expression "12"
    // history ["1+2=3", "3*4=12"]
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'calculator_data')
      .should('be.a', 'string')
      .then((s) => JSON.parse(s as unknown as string))
      .should('deep.equal', {
        version: 'v2',
        expression: '12',
        history: ['1+2=3', '3*4=12'],
      })
  })

  it('restores the history from the local storage', () => {
    // set the local storage entry "calculator_data"
    // version v2
    // expression "-1"
    // and several history items
    cy.window()
      .its('localStorage')
      .invoke(
        'setItem',
        'calculator_data',
        JSON.stringify({
          version: 'v2',
          expression: '12',
          history: ['1+2+3=6', '3-4=-1'],
        }),
      )

    CalculatorPage.visit()
    // confirm the history is restored correctly
    CalculatorPage.checkHistory('1+2+3=6', '3-4=-1')
  })

  it('correctly migrates v1 history to v2', () => {
    // set the local storage to the "v1" format
    // with the expression "12"
    cy.window()
      .its('localStorage')
      .invoke(
        'setItem',
        'calculator_data',
        JSON.stringify({
          version: 'v1',
          expression: '12',
        }),
      )

    CalculatorPage.visit()
    // confirm the v1 data is migrated to v2
    //  - history shows the last expression = itself
    //  - the local storage entry is updated to v2
    cy.get('#display').should('have.text', '12')
    CalculatorPage.checkHistory('12=12')
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'calculator_data')
      .should('be.a', 'string')
      .then((s) => JSON.parse(s as unknown as string))
      .should('deep.equal', {
        version: 'v2',
        expression: '12',
        history: ['12=12'],
      })
  })

  it('appends new history items to the restored history', () => {
    cy.window()
      .its('localStorage')
      .invoke(
        'setItem',
        'calculator_data',
        JSON.stringify({
          version: 'v2',
          expression: '12',
          history: ['1+2+3=6', '3-4=-1'],
        }),
      )

    CalculatorPage.visit()
    // confirm the history is restored correctly
    CalculatorPage.checkHistory('1+2+3=6', '3-4=-1')
    // compute one more expression and check the history
    // it should include the restored items and the new one
    CalculatorPage.clear().compute('0+0', '0')
    CalculatorPage.checkHistory('1+2+3=6', '3-4=-1', '0+0=0')
    // check the local storage entry
    // does it have the restored and the new history items?
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'calculator_data')
      .should('be.a', 'string')
      .then((s) => JSON.parse(s as unknown as string))
      .should('deep.equal', {
        version: 'v2',
        expression: '0',
        history: ['1+2+3=6', '3-4=-1', '0+0=0'],
      })
  })
})
