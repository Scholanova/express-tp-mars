class NotEvenResultError extends Error {
  constructor (value) {
    const message = `value: ${value} is not an even value`
    super(message)
  }
}

class MustBePositiveError extends Error {
  constructor (value) {
    const message = `value: ${value} is not a postive value`
    super(message)
  }
}

module.exports = {
  NotEvenResultError,
  MustBePositiveError
}
