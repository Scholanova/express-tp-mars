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

module.exports = {
  NotEvenResultError,
  NegativeResultError
}
