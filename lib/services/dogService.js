const { NullDogResultError, ParamIsMissingError } = require('../errors')
const dogRepository = require('../repositories/dogRepository')


const dogService = {
  create: (dogData) => {
    return Promise.resolve(dogData)
      .then((dogData) => {
        if (!dogData) {
          throw new NullDogResultError()
        }
        if (!dogData.name) {
            throw new ParamIsMissingError('Name')
        }
        if (!dogData.age) {
            throw new ParamIsMissingError('Age')
        }
        if (dogData.age) {
            const ageAsInt = parseInt(dogData.age)
        
            if (isNaN(ageAsInt)) {
                ParamIsMissingError('real Age')
            } else if (ageAsInt < 0) {
                ParamIsMissingError('Age > 0')
            }
          }
        return dogData
      })
      .then((dogData) => {
        return dogRepository.create(dogData)
      })
  }
}

module.exports = dogService