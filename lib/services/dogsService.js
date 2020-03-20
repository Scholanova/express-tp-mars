const dogRepository = require('../repositories/dogRepository');
const { MissingFieldsError,  LowerThanZeroError } = require('../../lib/errors');

module.exports = {
    create: (data) => {
        return Promise.resolve(data)
            .then(data => {
                if ( !data.name || data.name != '') {
                    throw new MissingFieldsError('name')
                }
                if (!data.age) {
                    throw new MissingFieldsError('age')
                }
                if ( data.age < 0 ) {
                    throw new LowerThanZeroError(data.age)
                }
 
                return dogRepository.create(data)
            })
    }
}