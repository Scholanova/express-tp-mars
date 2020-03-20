class NotEvenResultError extends Error {
  constructor (value) {
    const message = `value: ${value} is not an even value`
    super(message)
  }
}

class NullDogResultError extends Error {
  constructor () {
    const message = `Dog Probleme`
    super(message)
  }
}

class NameDogIsMissingError extends Error {
  constructor () {
    const message = `Name Dog is missing`
    super(message)
  }
}

module.exports = {
  NotEvenResultError,
  NullDogResultError
}
