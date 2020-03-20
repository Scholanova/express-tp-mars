const { NotEvenResultError } = require('../errors')


const dogsRepository = require('../repositories/dogRepository')


const dogService = {
  get: (id) => {
    return dogsRepository.get(id);
  },  create: (dogData) => {
        return dogsRepository.create(dogData);

  },
  listAll: () => {
    return dogsRepository.findAll()
  }
}

module.exports = dogService
module.exports = dogsRepository

