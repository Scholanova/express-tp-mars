class NotEvenResultError extends Error {
  constructor (value) {
    const message = `value: ${value} is not an even value`
    super(message)
  }
}

class NegativeResultError extends Error {
  constructor (value1, value2) {
    const message = `value 1 : ${value1} moins que ${value2} donc result negatif`
    super(message)
  }
}

class AgeMustBePositive extends Error {
  constructor (age) {
    const message = `Age must be positive : ${age} `
    super(message)
  }
}

class AgeMustBeFilled extends Error {
  constructor () {
    const message = `Age must be filled`
    super(message)
  }
}

class NameMustBeFilled extends Error {
  constructor () {
    const message = `Name must be filled`
    super(message)
  }
}

module.exports = {
  NotEvenResultError,
  NegativeResultError,
  NameMustBeFilled,
  AgeMustBeFilled,
  AgeMustBePositive
}
