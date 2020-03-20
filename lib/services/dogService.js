const dogRepository = require('../repositories/dogRepository');
const { RequiredFieldsError, NoEmptyField, NegativeAgeError } = require('../../lib/errors');

module.exports = {
    create(dogdata) {
        return Promise.resolve(dogdata)
            .then(dogdata => {
                if(dogdata.name!="" || dogdata.age!="" && dogdata.age>0)
                {
                    return dogRepository.create(dogdata) 
                }
                if ( !dogdata.name || !dogdata.age ) {
                    throw new RequiredFieldsError('name', 'age')
                }

                if(dogdata.name=="" || dogdata.age=="")
                {
                    throw new NoEmptyField('name', 'age')
                }

                if ( dogdata.age < 0 ) {
                    throw new NegativeAgeError('age')
                }

                //return dogRepository.create(dogdata)
            })
    }
}