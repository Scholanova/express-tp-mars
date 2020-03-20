const dogsRepository = require('../repositories/dogRepository')
const { NameCantBeEmptyError,AgeCantBeEmptyError,AgeCantNotBeANumberError,AgeCantBeNegativeError } = require('../errors')

const dogsService = {
    create: (dogData) => {
        
        return Promise.resolve(dogData)
          .then((dogData) => {
            if (!dogData.name){
                throw new NameCantBeEmptyError(dogData.name)
            }
            else if (!dogData.age) {
                throw new AgeCantBeEmptyError(dogData.age)
            }
            else if (!Number.isInteger(dogData.age)) {
                throw new AgeCantNotBeANumberError(dogData.age)
            }
            else if (dogData.age<=0) {
                throw new AgeCantBeNegativeError(dogData.age)
            }
            return dogsRepository.create(dogData)
          })
      },
}

module.exports = dogsService