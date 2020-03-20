const dogsRepository = require('../repositories/dogRepository')
const { NameCantBeEmptyError,AgeCantBeEmptyError,AgeCantbeNegativeError } = require('../errors')

const dogsService = {
    create: (dogData) => {
        return Promise.resolve(dogData)
          .then((dogData) => {
            if (dogData.name.length()<=0){
                throw new NameCantBeEmptyError()
            }
            else if (dogData.age.length()<=0) {
                throw new AgeCantBeEmptyError()
            }
            else if (dogData.age<=0) {
                throw new AgeCantbeNegativeError()
            }
            return dogsRepository.create(dogData)
          })
      },
}

module.exports = dogsService