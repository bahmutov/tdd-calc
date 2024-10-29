// calculator logic

function appendDot(expression) {
  // check if we are trying a number right now
  // this will split expressions like
  // "1+2.3" into ["1", "2.3"]
  const parts = expression.split(/[\+\-\*\/]/)
  // the last part is the current number
  // the user is appending to
  const last = parts[parts.length - 1]
  //
  // if the last part already has a dot, do nothing
  if (last.includes('.')) {
    return expression
  }
  // if the last part is empty, add a zero before the dot
  // this will cover starting to type a number with a dot
  // or typing a dot after an expression like "1+"

  if (last === '') {
    return expression + '0.'
  }
  // otherwise, add the dot and return the expression
  return expression + '.'
}

/**
 * Function that receives a digit to append to the currently displayed text
 * @param {number|'+'|'-'|'*'|'/'} digit A single digit to append to the display text
 */
function enterDigit(digit) {
  const display = document.getElementById('display')
  if (digit === '.') {
    // special logic for adding the "." character
    display.innerText = appendDot(display.innerText)
  } else {
    display.innerText += digit
  }
}

/**
 * Compute the current display text as a JavaScript arithmetic expression
 * using the `eval` function and replace the display text with the result
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
 */
function calculate() {}

/**
 * Clears the current display text
 */
function clearDisplay() {
  const display = document.getElementById('display')
  display.innerText = ''
}
