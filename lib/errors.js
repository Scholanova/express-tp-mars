class NotEvenResultError extends Error {
  constructor (value) {
    const message = `value: ${value} is not an even value`
    super(message)
  }
}
class MustBePositiveError extends Error {
  constructor (value) {
    const message = `value: ${value} is no a positive value`
    super(message)
  }
}
class DogNotFoundError extends Error {
  constructor (value) {
    const message = `dog id : ${value} does not exist.`
    super(message)
  }
}

class NameCantBeEmptyError extends Error {
  constructor (value) {
    const message = `name : does not exist.`
    super(message)
  }
}
class AgeCantBeEmptyError extends Error {
  constructor (value) {
    const message = `dog age : ${value} does not exist.`
    super(message)
  }
}
class AgeCantBeNegativeError extends Error {
  constructor (value) {
    const message = `dog age : ${value} is negative.`
    super(message)
  }
}
class AgeCantNotBeANumberError extends Error {
  constructor (value) {
    const message = `dog age : ${value} is not a number.`
    super(message)
  }
}

module.exports = {
  NotEvenResultError,
  MustBePositiveError,
  DogNotFoundError,
  NameCantBeEmptyError,
  AgeCantBeEmptyError,
  AgeCantBeNegativeError,
  AgeCantNotBeANumberError
}
