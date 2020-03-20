const { NullDogResultError } = require('../errors')
const models = require('../models')
const dogRepository = require('../repositories/dogRepository')
const Dog = models.Dog

const dogService = {
  create: (dogData) => {
    return Promise.resolve(dogData)
      .then((dogData) => {
        return dogRepository.create(dogData)
      })
      .then((dog) => {
        if (dog == null) {
          throw new NullDogResultError()
        }
        return dog
      })
  }
}

module.exports = dogService