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
  NegativeResultError,
  NotEvenResultError,
    ResourceNotFoundError,
  ValidationError
}
