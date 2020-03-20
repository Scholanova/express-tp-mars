const dogsRepository = require('../repositories/dogRepository')
const { NameCantBeEmptyError,AgeCantBeEmptyError,AgeCantNotBeANumberError,AgeCantBeNegativeError } = require('../errors')

const dogsService = {
    create: (dogData) => {
        return Promise.resolve(dogData)
          .then((dogData) => {
            if (!dogData.name){
                throw new NameCantBeEmptyError()
            }
            else if (!dogData.age) {
                throw new AgeCantBeEmptyError()
            }
            else if (!Number.isInteger(dogData.age)) {
                throw new AgeCantNotBeANumberError()
            }
            else if (parseInt(dogData.age)<=0) {
                throw new AgeCantBeNegativeError()
            }
            return dogsRepository.create(dogData)
          })
      },
}

module.exports = dogsService