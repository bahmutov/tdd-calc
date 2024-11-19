// calculator logic

import { appendDot } from './utils.js'

/**
 * Reads the calculator data from the storage.
 * If the data cannot be loaded, returns the default object.
 * @returns {Object} The loaded data object in v2 format
 */
function loadData() {
  const defaultData = {
    version: 'v2',
    expression: '',
    history: [],
  }

  try {
    // read the data from the local storage "calculator_data" key
    // if the data is in v1 format, upgrade it to v2
    const data = JSON.parse(localStorage.getItem('calculator_data'))
    if (!data) {
      return defaultData
    }

    if (data.version === 'v1') {
      data.history = []
      if (!('expression' in data)) {
        data.expression = ''
      }
      if (data.expression) {
        data.history.push(`${data.expression}=${data.expression}`)
      }
      // we just migrated the data from v1 to v2
      // save it back to the storage
      data.version = 'v2'
      saveData(data)
      return data
    } else if (data.version === 'v2') {
      if (!('expression' in data)) {
        data.expression = ''
      }
      if (!Array.isArray(data.history)) {
        data.history = []
      }
      return data
    } else {
      return defaultData
    }
  } catch {
    // ignore serialization errors
    saveData(defaultData)
    return defaultData
  }
}

/**
 * Save the calculator data to the storage.
 * Call this method every time the data changes.
 */
function saveData(data) {
  localStorage.setItem('calculator_data', JSON.stringify(data))
}

// the current list of history entries
const history = []

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
    display.innerText = 'INVALID'
    return
  }

  try {
    const result = eval(expression)
    display.innerText = result
  } catch (err) {
    display.innerText = 'ERROR'
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
