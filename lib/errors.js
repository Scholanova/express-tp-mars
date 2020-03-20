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

class MissingFieldsError extends Error {
  constructor (value) {
    const message = `field: ${value} is empty`
    super(message)
  }
}

class LowerThanZeroError extends Error {
  constructor (value) {
    const message = `value: ${value} is negative`
    super(message)
  }
}

module.exports = {
  NotEvenResultError,
  NotValidResult,
  MissingFieldsError,
  LowerThanZeroError
}
