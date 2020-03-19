const dogRepository = require('../repositories/dogRepository');
const { MissingFieldsError, CannotBeEmptyField, LowerThanZeroError } = require('../../lib/errors');

module.exports = {
    create(data) {
        return Promise.resolve(data)
            .then(data => {
                if ( !data.name || !data.age ) {
                    throw new MissingFieldsError('name', 'age')
                }

                if ( data.age < 0 ) {
                    throw new LowerThanZeroError('age')
                }

                return dogRepository.create(data)
            })
    }
}