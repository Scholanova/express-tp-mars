class NotEvenResultError extends Error {
  constructor (value) {
    const message = `value: ${value} is not an even value`
    super(message)
  }
}

class NegativeResultError extends Error {
  constructor(value) {
    const message = `value: ${value} is equal or greater than zero`
    super(message)
  }
}

class MissingFieldsError extends Error {
  constructor(...fields) {
    super(`fields: ${fields.join(', ')} are required`)
    this.name = 'MissingFieldsError';
    this.errors = Object.fromEntries(fields.map( field => [field, `${field} is required.`]));
  }
}

class CannotBeEmptyField extends Error {
  constructor(field) {
    const message = `field ${field} cannot be empty`
    super(message)
  }
}

class LowerThanZeroError extends Error {
  constructor(field) {
    const message = `field ${field} cannot have a value lower than zero`
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
  CannotBeEmptyField,
  LowerThanZeroError,
  ResourceNotFoundError,
  ValidationError
}