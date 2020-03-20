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

class NoEmptyFieldError extends Error {
  constructor(value) {
    const message = ` ${value} cannot be empty`
    super(message)
  }
}

class NameCannotBeNumberError extends Error {
  constructor(value) {
    const message = `The value ${value} cannot be a number`
    super(message)
  }
}

class AgeMustBeNumberError extends Error {
  constructor(value) {
    const message = `The value ${value} must be a number`
    super(message)
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
  NoEmptyFieldError,
  NameCannotBeNumberError,
  AgeMustBeNumberError,
  NegativeAgeError
}