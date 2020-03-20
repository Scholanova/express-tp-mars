const models = require('../models')
const Dog = models.Dog
const dogRepository = {
  get: (id) => {return Dog.findOne({where: {id}})},
  create: (dog) => {
    return dog.save()
  },
  listAll: () => {
    return Dog.findAll()
  }
}

module.exports = dogRepository
