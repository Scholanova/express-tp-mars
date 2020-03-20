
const { ValidationError } = require('../errors')
const dogRepository = require('../repositories/dogRepository')

const dogService = {
  create: (dogData) => {
    return Promise.resolve(dogData)
      .then(validateDogData)
      .then(dogRepository.create)
  }
}

function validateDogData (dogData) {
  const failedFields = []

  if (!dogData.name) {
    failedFields.push(['name', 'cannot be empty'])
  }
  if (!dogData.age) {
    failedFields.push(['age', 'cannot be empty'])
  } else {
    const ageAsInt = parseInt(dogData.age)

    if (isNaN(ageAsInt)) {
      failedFields.push(['age', 'must be a number'])
    } else if (ageAsInt < 0) {
      failedFields.push(['age', 'cannot be negative'])
    }
  }

  if (failedFields.length > 0) {
    const validationError = new ValidationError()
    failedFields.forEach(([fieldName, errorMessage]) => {
      validationError.addFailedField(fieldName, errorMessage)
    })

    throw validationError
  }

  return dogData
}

module.exports = dogService
