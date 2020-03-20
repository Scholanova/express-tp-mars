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

class RessourceNotFoundError extends Error {
  constructor (value) {
    super(value)
  }
}

class Invalidated extends Error {
  constructor (value) {
    const message = `Wrong VALUE`
    super(message)
  }
}

module.exports = {
  NegativeResultError,
  NotEvenResultError,
  RessourceNotFoundError,
  Invalidated
}