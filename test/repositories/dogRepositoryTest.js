const { expect } = require('../testHelper')

const dogRepository = require('../../lib/repositories/dogRepository')
const models = require('../../lib/models')
const { RessourceNotFoundError } = require('../../lib/errors')
const Dog = models.Dog

describe('dogRepository', () => {

  afterEach(async () => {
    await Dog.destroy({ where: {} })
  })

  describe('get', () => {

    let notExistingId
    let getDogPromise

    context('dog does not exist', () => {
      beforeEach(async () => {
        // given
        notExistingId = 23456789

        // when
        getDogPromise = dogRepository.get(notExistingId)
      })

      it('should throw a not found error', () => {
        // then
        return expect(getDogPromise).to.eventually.be.rejectedWith(ReferenceError)
      })
    })
  })

  describe('create', () => {

    let createdDog
    let retrievedDog
    let dogData

    beforeEach(async () => {
      // given
      dogData = { name: 'Rex', age: 12 }

      // when
      createdDog =  await dogRepository.create(dogData)
      retrievedDog = await dogRepository.get(createdDog.id)
    })

    it('should return a dog with the right properties', () => {
      // then
      const createdDogValue = createdDog.get()
      const retrievedDogValue = retrievedDog.get()

      expect(createdDogValue.name).to.equal(dogData.name)
      expect(createdDogValue.age).to.equal(dogData.age)

      expect(createdDogValue).to.deep.equal(retrievedDogValue)
    })
  })

  describe('listAll', () => {
    let result

    context('when there is no dogs in the repository', () => {

      beforeEach(async () => {
        // given

        // when
        result = await dogRepository.listAll()
      })

      it('should return an empty list', () => {
        // then
        expect(result).to.be.empty
      })
    })

    context('when there is a dog in the repository', () => {

      let dog

      beforeEach(async () => {
        // given
        dog = await dogRepository.create({ name: 'Rex', age: 12 })

        // when
        result = await dogRepository.listAll()
      })

      it('should return a list with the dog', () => {
        // then
        const dogValue = dog.get()
        const resultValues = result.map((dog) => dog.get())
        expect(resultValues).to.deep.equal([dogValue])
      })
    })
  })
})
