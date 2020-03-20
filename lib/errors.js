class NotEvenResultError extends Error {
  constructor (value) {
    const message = `value: ${value} is not an even value`
    super(message)
  }
}

class NegativeResultError extends Error {
  constructor (value) {
    const message = `value: ${value} is negative`
    super(message)
  }
}

class MissingFieldsError extends Error {
  constructor(...fields) {
    const message = `fields: ${fields.join(', ')} are required`
    super(message)
  }
}

class CannotBeEmptyFieldError extends Error {
  constructor(field) {
    const message = `field ${field} cannot be empty`
    super(message)
  }
}

class NegativeAgeError extends Error {
  constructor(field) {
    const message = `Age ${field} cannot be lower than zero`
    super(message)
  }
}

class ResourceNotFoundError extends Error {
  constructor (value) {
    super(value)
  }
}

class ValidationError extends Error {

  constructor () {
    super()
    this.failedFields = []
  }

  addFailedField (fieldName, errorMessage) {
    this.failedFields.push({ fieldName, errorMessage })
  }
}

module.exports = {
  NotEvenResultError,
  NegativeResultError,
  MissingFieldsError,
  CannotBeEmptyFieldError,
  NegativeAgeError,
  ResourceNotFoundError,
  ValidationError
}
