// load and save application data

/**
 * Reads the calculator data from the storage.
 * If the data cannot be loaded, returns the default object.
 * @returns {Object} The loaded data object in v2 format
 */
export function loadData() {
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
export function saveData(data) {
  localStorage.setItem('calculator_data', JSON.stringify(data))
}
