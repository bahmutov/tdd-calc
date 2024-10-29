describe('Calculator', () => {
  beforeEach(() => {
    cy.visit('public/index.html')
  })

  it('enters whole numbers', () => {
    const expression = '123'
    cy.enterExpression(expression)
    cy.get('#display').should('have.text', expression)
  })

  it('enters a floating-point number', () => {
    const expression = '123.45'
    cy.enterExpression(expression)
    cy.get('#display').should('have.text', expression)
  })

  it('enters a floating point number between 0 and 1', () => {
    const expression = '0.123'
    cy.enterExpression(expression)
    cy.get('#display').should('have.text', expression)
  })

  it('enters a negative floating point number', () => {
    const expression = '-9.876'
    cy.enterExpression(expression)
    cy.get('#display').should('have.text', expression)
  })

  it('enters a sum of two floating point numbers', () => {
    const expression = '1.1+2.2'
    cy.enterExpression(expression)
    cy.get('#display').should('have.text', '1.1+2.2')
  })

  context('edge-cases', () => {
    // should skip the second dot: "1.1.1" => "1.11"
    it('cannot enter a floating-point number with multiple decimal points', () => {
      const expression = '1.1.1'
      cy.enterExpression(expression)
      cy.get('#display').should('have.text', '1.11')
    })

    // should add zero automatically: ".12" => "0.12"
    it('cannot start a number with a dot', () => {
      const expression = '.12'
      cy.enterExpression(expression)
      cy.get('#display').should('have.text', '0.12')
    })

    // should add zero automatically to the second number
    // "1+.23" => "1+0.23"
    it('cannot continue an expression with a dot', () => {
      const expression = '1+.23'
      cy.enterExpression(expression)
      cy.get('#display').should('have.text', '1+0.23')
    })
  })
})
