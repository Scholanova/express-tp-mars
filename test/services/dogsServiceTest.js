const { expect, sinon, eventually } = require('../testHelper')

const dogService = require('../../lib/services/dogsService')
const dogRepository = require('../../lib/repositories/dogRepository')
const models = require('../../lib/models')
const Dog = models.Dog
const { MissingFieldsError, NotEvenResultError } = require('../../lib/errors')

describe('dogService', () => {

  describe('create', () => {
    let createdDog
    let dogData
    beforeEach(() => {
      sinon.stub(dogRepository, 'create')
    })
    context('when the dog data is valid', () => {
      let dog
      beforeEach(() =>{
        // given
        dogData = { name: 'Rex', age: 12 }
        dog = new Dog({name: 'Rex', age: '12'})
        dogRepository.create.resolves(dog)
        // when
        createdDog = dogService.create(dogData)
      })

      it('should call the dog Repository with the creation data', async () => {
        // then
        await createdDog
        expect(dogRepository.create).to.have.been.calledWith(dogData)
      })
      it('should resolve with the created dog from repository', () => {
        // then
        return expect(createdDog).to.eventually.be.equal(dog)
      })
    })

    context('when the dog data is missing a name', () => {

      beforeEach(async () =>{
        // given
        dogData = { name: '', age: 12 }
      })

      it('should not call the dog Repository', () => {
        // then
        try{
          // when
          result = dogService.create(dogData)
        }
        catch (e){
          expect(dogRepository.create).to.not.have.been.called
        }
      })
      it('should reject with a missing parameter error', () => {
        // then
        try{
          // when
          result = dogService.create(dogData)
        }
        catch (e){
          if(e instanceof MissingFieldsError){
            throw e;
          }
          expect(result).to.be.eventually.rejectedWith(MissingFieldsError)
        }
      })
    })

    // context('when the dog data is missing an age', () => {

    //   beforeEach(async () =>{
    //     // given
    //     dogData = { name: 'Popy'}

    //     // when
    //     createdDog =  await dogService.create(dogData)
    //   })

    //   it('should not call the dog Repository', () => {
    //     // then

    //   })
    //   it('should reject with a missing parameter error', () => {
    //     // then
    //   })
    // })
  })
})