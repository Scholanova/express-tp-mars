const models = require('../models')
const { ResourceNotFoundError } = require('../errors')
const Dog = models.Dog

const dogRepository = {
  get: (id) => {
    return Dog.findOne({where: {id}})
      .then((dogResult) => {
        if(dogResult === null) {
          throw new ResourceNotFoundError()
        }
        return dogResult
      })
  },
  create: (dogData) => {
    const dog = new Dog(dogData)
    return dog.save()
  },
  listAll: () => {
    return Dog.findAll()
  }
}

module.exports = dogRepository
