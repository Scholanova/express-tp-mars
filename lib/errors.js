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
  constructor(...fields) {
    const message = `both fields: ${fields.join(',')} are required`
    super(message)
  }
}

class NoEmptyField extends Error {
  constructor(field) {
    const message = ` The field ${field} cannot be empty`
    super(message)
  }
}

class NegativeAgeError extends Error {
  constructor(field) {
    const message = `The field ${field} cannot be negative`
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