const models = require('../models')
const Dog = models.Dog
const dogRepository = {
  get: (id) => {return Dog.findOne({where: {id}})},
  create: (dogData) => {
  	console.log(dogData);
    const dog = new Dog(dogData)
    return dog.save()
  },
  listAll: () => {
    return Dog.findAll()
  }
}

module.exports = dogRepository
