// calculator logic

import { appendDot } from './utils.js'
import { loadData, saveData } from './db.js'

// the current list of history entries
const history = []

/**
 * The current language of the calculator
 * @type {'EN'|'DE'}
 */
let language = 'EN'

// TODO: on startup, determine the language based on the cookie
// if the cookie includes the language=de, set the language to DE
if (document.cookie.includes('language=de')) {
  language = 'DE'
}

// on page visit
// load the data and update the display and history elements
try {
  const data = loadData()
  document.getElementById('display').innerText = data.expression
  if (Array.isArray(data.history)) {
    const historyListElement = document.getElementById('history-list')
    historyListElement.innerHTML = data.history
      .map((item) => `<li>${item}</li>`)
      .join('\n')
    history.length = 0
    history.push(...data.history)
  }
  // update the copy history button state
  updateCopyHistory()
} catch {
  // ignore serialization errors
}

// we probably want to keep around the reference to the
// LI element with ID "history-list" to append new history items
const historyListElement = document.getElementById('history-list')
// get the reference to the copy history button
const copyHistoryElement = document.getElementById('copy-history')

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

  // store the current expression in the localStorage
  const data = {
    version: 'v2',
    expression: display.innerText,
    history,
  }
  saveData(data)
}

/**
 * Compute the current display text as a JavaScript arithmetic expression
 * using the `eval` function and replace the display text with the result
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
 */
function calculate() {
  const display = document.getElementById('display')
  const expression = display.innerText

  // check the expression to be a simple numerical expression
  // without any extra characters
  // we only allow the following characters
  // digits, "+", "-", "*", "/", "."
  if (!/^[\d\-\+\*\/\.]+?$/.test(expression)) {
    // TODO: set the display text to "INVALID" in the current language
    // Tip: in German, "invalid" is "ungültiger"
    display.innerText = language === 'DE' ? 'UNGÜLTIGER' : 'INVALID'
    return
  }

  try {
    const result = eval(expression)
    display.innerText = result
  } catch (err) {
    // TODO: set the display text to "ERROR" in the current language
    // Tip: in German, "error" is "fehler"
    display.innerText = language === 'DE' ? 'FEHLER' : 'ERROR'
    // after 1 second, put the original
    // expression back in the display
    setTimeout(() => {
      display.innerText = expression
    }, 1000)
  }

  // append the new expression and result to the history list
  const historyItem = `${expression}=${display.innerText}`
  historyListElement.innerHTML += `<li>${historyItem}</li>`
  // store the history in the localStorage
  history.push(historyItem)
  // update the copy history button state
  updateCopyHistory()

  // store the current expression in the localStorage
  const data = {
    version: 'v2',
    expression: display.innerText,
    history,
  }
  saveData(data)
}

/**
 * Clears the current display text
 */
function clearDisplay() {
  const display = document.getElementById('display')
  display.innerText = ''
}

function updateCopyHistory() {
  // if the history is empty, disable the button
  // otherwise enable it
  // Tip: if you have a DOM element reference, you
  // can simply set its `disabled` property to true or false
  if (history.length === 0) {
    copyHistoryElement.disabled = true
  } else {
    copyHistoryElement.disabled = false
  }
}

// attach event handlers
// - button calculate should call the calculate function
// - button clear should call the clearDisplay function
// - all digit buttons should call the enterDigit function
document
  .querySelector('#buttons button[title=calculate]')
  .addEventListener('click', calculate)
document
  .querySelector('#buttons button[title="clear display"]')
  .addEventListener('click', clearDisplay)
document
  .querySelectorAll('#buttons button[title="enter digit"]')
  .forEach((button) => {
    button.addEventListener('click', (e) => {
      // get the character from the event target
      const digit = e.target.innerText
      enterDigit(digit)
    })
  })
copyHistoryElement.addEventListener('click', async () => {
  // create a single text string from the history array
  const text = history.join('\n')
  // use the Clipboard API to copy the text to the clipboard
  // if the operation fails, log the error to the console
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error(err.name, err.message)
  }
})
