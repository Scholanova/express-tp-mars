class NotEvenResultError extends Error {
  constructor (value) {
    const message = `value: ${value} is not an even value`
    super(message)
  }
}

class NegativeResultError extends Error {
  constructor (value) {
    const message = `subtraction result: ${value} is negative`
    super(message)
  }
}

class RessourceNotFoundError extends Error {
  constructor (value) {
    super(value)
  }
}

class RequiredFieldsError extends Error {
  constructor(...values) {
    const message = `both values: ${values.join(',')} are required`
    super(message)
  }
}

class NoEmptyField extends Error {
  constructor(value) {
    super(value)
    const message = ` ${value} cannot be empty`
  }
}

class NegativeAgeError extends Error {
  constructor(value) {
    const message = `The value ${value} cannot be negative`
    super(message)
  }
}


  module.exports = {
  NegativeResultError,
  NotEvenResultError,
  RessourceNotFoundError,
  RequiredFieldsError,
  NoEmptyField,
  NegativeAgeError
}