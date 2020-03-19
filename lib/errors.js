class NotEvenResultError extends Error {
  constructor (value) {
    const message = `value: ${value} is not an even value`
    super(message)
  }
}

class NegativeResultError extends Error {
  constructor (value1, value2) {
    const message = `value 1 : ${value1} moins que ${value2} donc result negatif`
    super(message)
  }
}

module.exports = {
  NotEvenResultError,
  NegativeResultError
}
