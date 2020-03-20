class NotEvenResultError extends Error {
  constructor (value) {
    const message = `value: ${value} is not an even value`
    super(message)
  }
}
class RessourceNotFoundError extends Error {
  constructor (value) {
    super(value)
  }
}
module.exports = {
  NotEvenResultError,
  RessourceNotFoundError
}
