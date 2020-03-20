const dogRepository = require('../repositories/dogRepository');
const { MissingFieldsError, CannotBeEmptyField, LowerThanZeroError } = require('../../lib/errors');

module.exports = {
    create(data) {
        return Promise.resolve(data)
            .then(data => {
                let errorFields = [];
                if ( !data.name ) {
                    errorFields.push('name')
                }

                if ( !data.age ) {
                    errorFields.push('age')
                }

                if ( errorFields ) {
                    throw new MissingFieldsError(errorFields)
                }

                if ( data.age < 0 ) {
                    throw new LowerThanZeroError('age')
                }

                return dogRepository.create(data)
            })
    }
}