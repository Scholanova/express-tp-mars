class NotEvenResultError extends Error {
  constructor (value) {
    const message = `value: ${value} is not an even value`
    super(message)
  }
}
  
class NotValidResult extends Error {
  constructor (value) {
    const message = `value: ${value} is a negative value`
    super(message)
  }
}

module.exports = {
  NotEvenResultError,
  NotValidResult
}
