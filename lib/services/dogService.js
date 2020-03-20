const { NotAValidAgeError,DogNotFoundError } = require('../errors')
const dogRepository = require('../repositories/dogRepository')
const models = require('../models')
const Dog = models.Dog

const dogService = {
    add:(dogdata) => {
        const dog = new Dog(dogdata)
        if(dog.age < 0){
            throw new NotAValidAgeError(age)
        }else{
            return dogRepository.create(dog)
        }
    }
}

module.exports = dogService
