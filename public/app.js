// calculator logic

function appendDot(expression) {
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
 * Clears the current display text
 */
function clearDisplay() {
  const display = document.getElementById('display')
  display.innerText = ''
}
