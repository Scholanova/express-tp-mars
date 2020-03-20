const { NameMustBeFilled, AgeMustBeFilled, AgeMustBePositive } = require('../errors')
const dogsRepository = require('../repositories/dogRepository')

const dogsService = {
  create: (name, age) => {
    return Promise.resolve([name, age])
      .then(([name, age]) => {
          if (!name) {
            throw new NameMustBeFilled()
          } else if(!age) {
            throw new AgeMustBeFilled()
          } else if(age < 1) {
            throw new AgeMustBePositive()
          } else {
            return dogsRepository.create({'name': name, 'age': age})
          }
      })
  },
}

module.exports = dogsService
