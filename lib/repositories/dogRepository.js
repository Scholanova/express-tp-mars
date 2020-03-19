const models = require('../models')
const Dog = models.Dog
const dogRepository = {
  create: (dogData) => {
    const dog = new Dog(dogData)
    return dog.save()
  },
  listAll: () => {
    return Dog.findAll()
  }
}

module.exports = dogRepository
