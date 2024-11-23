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

  context('v1', () => {
    it('handles missing expression', () => {
      // set the local storage to the "v1" format
      // but without the expression property
      cy.window()
        .its('localStorage')
        .invoke(
          'setItem',
          'calculator_data',
          JSON.stringify({
            version: 'v1',
          }),
        )

      CalculatorPage.visit()
      // confirm the display is empty
      cy.get('#display').should('have.text', '')
    })
  })

  context('unknown version', () => {
    it('handles wrong version', () => {
      // set the local storage to the "unknown" format
      // with some expression
      cy.window()
        .its('localStorage')
        .invoke(
          'setItem',
          'calculator_data',
          JSON.stringify({
            version: 'unknown',
            expression: '1234',
          }),
        )

      CalculatorPage.visit()
      // confirm the display is empty, it should not be restored
      cy.get('#display').should('have.text', '')
    })
  })

  context('v2', () => {
    it('handles missing expression', () => {
      // set the local storage to v2 format
      // but without the expression property
      cy.window()
        .its('localStorage')
        .invoke(
          'setItem',
          'calculator_data',
          JSON.stringify({
            version: 'v2',
            history: ['1+2+3=6', '3-4=-1'],
          }),
        )

      CalculatorPage.visit()
      // confirm the display is empty
      cy.get('#display').should('have.text', '')
      // confirm the history is restored correctly
      CalculatorPage.checkHistory('1+2+3=6', '3-4=-1')
    })

    it('handles non-array history', () => {
      // set the local storage to v2 format
      // but with the history property not an array
      cy.window()
        .its('localStorage')
        .invoke(
          'setItem',
          'calculator_data',
          JSON.stringify({
            version: 'v2',
            expression: '1234',
            history: '1+2+3=6',
          }),
        )

      CalculatorPage.visit()
      // confirm the display is restored correctly
      cy.get('#display').should('have.text', '1234')
      // confirm the history is empty
      CalculatorPage.checkHistory()
    })
  })

  it('copies the history to the clipboard', () => {
    cy.visit('public/index.html')
    // confirm there is a copy history button
    // with the title "Copy history to clipboard"
    // that is initially disabled
    // https://on.cypress.io/get
    // https://on.cypress.io/should
    cy.get('button#copy-history')
      .should('have.attr', 'title', 'Copy history to clipboard')
      .and('be.disabled')
    // compute several expressions
    // to populate the history list
    CalculatorPage.compute('1+2', '3').clear().compute('3*4', '12')
    CalculatorPage.checkHistory('1+2=3', '3*4=12')
    // get the clipboard object from the browser
    // (under window.navigator.clipboard)
    // and set up a spy on the method "writeText"
    // give the alias an alias "writeText"
    // https://on.cypress.io/window
    // https://on.cypress.io/its
    // https://on.cypress.io/spy
    // https://on.cypress.io/as
    // https://glebbahmutov.com/cypress-examples/commands/spies-stubs-clocks.html
    cy.window()
      .its('navigator.clipboard')
      .then((clipboard: Clipboard) => {
        cy.spy(clipboard, 'writeText').as('writeText')
      })
    // confirm the copy history button is enabled
    // and click on the button
    cy.get('button#copy-history').should('be.enabled').click()
    // confirm the clipboard spy alias was called with the correct text
    cy.get('@writeText').should(
      'have.been.calledOnceWithExactly',
      '1+2=3\n3*4=12',
    )
  })

  it('logs errors when copying to clipboard fails', () => {
    cy.visit('public/index.html')
    CalculatorPage.compute('1+2', '3')
    CalculatorPage.checkHistory('1+2=3')
    // spy on the "window.console.error" method
    // and give it an alias "error"
    // https://on.cypress.io/window
    // https://on.cypress.io/its
    // https://on.cypress.io/spy
    // https://on.cypress.io/as
    cy.window()
      .its('console')
      .then((console: Console) => {
        cy.spy(console, 'error').as('error')
      })
    // stub the "navigator.clipboard.writeText" method
    // and make it throw an error "Clipboard write failed"
    // give the stub an alias "writeText"
    // https://on.cypress.io/window
    // https://on.cypress.io/its
    // https://on.cypress.io/stub
    // https://on.cypress.io/as
    cy.window()
      .its('navigator.clipboard')
      .then((clipboard: Clipboard) => {
        cy.stub(clipboard, 'writeText')
          .as('writeText')
          .throws(new Error('Clipboard write failed'))
      })
    cy.get('button#copy-history').click()
    // confirm the clipboard writeText stub was called
    cy.get('@writeText').should('have.been.called')
    // confirm the console.error spy was called with the correct arguments
    // - the name of the Error class
    // - the message "Clipboard write failed"
    cy.get('@error').should(
      'have.been.calledOnceWithExactly',
      'Error',
      'Clipboard write failed',
    )
  })

  it('handles serialization error', () => {
    // set the local storage to a string that is not a valid JSON
    // under the key "calculator_data"
    cy.window()
      .its('localStorage')
      .invoke('setItem', 'calculator_data', 'bad json data')
    cy.visit('public/index.html')
    // confirm the application automatically saves
    // default v2 data to the local storage
    //  - version v2
    //  - empty expression
    //  - empty history
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'calculator_data')
      .should('be.a', 'string')
      .then((s) => JSON.parse(s as unknown as string))
      .should('deep.equal', {
        version: 'v2',
        expression: '',
        history: [],
      })
  })

  it('handles non-array history', () => {
    // how do we return invalid data from "loadData"?
    // we could simply overwrite the "/public/db.js" source code
    // by using cy.intercept GET command. We can return
    // fake source code with "loadData" and "saveData" functions
    // The fake "loadData" can return an arbitrary object
    // that can have non-array history property
    // https://on.cypress.io/intercept
    cy.intercept('GET', '/public/db.js', {
      headers: {
        'content-type': 'application/javascript',
      },
      body: `
      export function loadData() {
        return {
          version: 'v2',
          expression: '12',
          history: '',
        }
      }
      export function saveData() {}
    `,
    })
      // give the network intercept alias "db"
      // https://on.cypress.io/as
      .as('db')
    cy.visit('public/index.html')
    // confirm the network stub "db" was used
    // https://on.cypress.io/wait
    cy.wait('@db')
    // the display should show text "12"
    cy.get('#display').should('have.text', '12')
    // the history list should be empty
    CalculatorPage.checkHistory()
  })

  it('saves history by calling the saveData function', () => {
    // intercept the GET request to "/public/db.js"
    // and modify the source code for the "saveData" function
    // to call a spy function with the data
    // Tip: use req.continue to modify the response body
    // https://on.cypress.io/intercept
    // Tip: call the "window.__saveDataSpy" function
    //
    // we need the full source code,
    // so remove all outgoing request headers
    // the browser uses to cache the response
    // "if-none-match" and "if-modified-since"
    //
    // give the network intercept alias "db"
    // https://on.cypress.io/as
    //
    // visit the page and add to the "window" object
    // a spy function "__saveDataSpy"
    // https://on.cypress.io/visit
    // https://on.cypress.io/spy
    // give the spy an alias "saveData"
    // https://on.cypress.io/as
    //
    // wait for the network request "db" to finish
    // compute an expression, like "1+2"
    //
    // get the function alias "saveData"
    // and confirm it was called once
    // get the spy's first argument
    // and confirm it is an object
    //  - version "v2"
    //  - expression "3"
    //  - history ["1+2=3"]
  })
})
