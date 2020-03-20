class NotEvenResultError extends Error {
  constructor (value) {
    const message = `value: ${value} is not an even value`
    super(message)
  }
}

class NegativeResultError extends Error {
  constructor(value) {
    const message = `substraction result: ${value} is negative`
    super(message)
  }
}

class ResourceNotFoundError extends Error {
  constructor (value) {
    super(value)
  }
}

module.exports = {
  NotEvenResultError,
  NegativeResultError,
  ResourceNotFoundError
}
