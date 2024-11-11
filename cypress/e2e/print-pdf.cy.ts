// https://github.com/bahmutov/cypress-cdp
import 'cypress-cdp'

it(
  'prints the calculator page as PDF',
  // Note: this test only runs in Chrome browser
  // thus we restrict the test to run only in desktop Chrome
  { viewportWidth: 1000, browser: 'chrome' },
  () => {
    cy.visit('public/index.html')

    cy.get('#calculator')
      .should('be.visible')

      .then(() => {
        // before printing the browser window into PDF
        // remove the Cypress UI leaving just the app contents
        window.top.document
          .querySelector('#spec-runner-header')
          .remove()
        window.top.document
          .querySelector('[data-cy="reporter-panel"]')
          .remove()

        // only if we are using "cypress open"
        // it shows the specs widget
        if (Cypress.browser.isHeaded) {
          window.top.document
            .querySelector('[data-cy="sidebar"]')
            .remove()
        }
      })

    cy.CDP('Page.enable')
    // https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF
    // use landscape mode and print the background, scale 0.75
    // return the PDF as base64
    cy.CDP('Page.printToPDF', {
      landscape: true,
      printBackground: true,
      scale: 0.75,
      transferMode: 'ReturnAsBase64',
    })
      // which will be an object { data: 'base64 string' }
      // grab the "data" property and write it to a file
      // https://on.cypress.io/its
      // https://on.cypress.io/writefile
      .its('data')
      .then((data) => cy.writeFile('calculator.pdf', data, 'base64'))
  },
)
