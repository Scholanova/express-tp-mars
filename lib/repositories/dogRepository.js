const { DogNotFoundError } = require('../errors')

const models = require('../models')
const Dog = models.Dog
const dogRepository = {
  get: (id) => {
    return Dog.findOne({where: {id}})
    .then((dog) => {
      if(dog === null ){
        throw new DogNotFoundError()
      }
      else{return dog}
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
