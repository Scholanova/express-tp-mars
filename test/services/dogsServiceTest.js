const { expect, sinon } = require('../testHelper')
const dogRepository = require('../../lib/repositories/dogRepository')
const dogsService = require('../../lib/services/dogsService')
const { NameCantBeEmptyError,AgeCantBeEmptyError,AgeCantBeNegativeError,AgeCantNotBeANumberError } = require('../../lib/errors')
const models = require('../../lib/models')
const Dog = models.Dog
describe('dogService', () => {

  describe('create', () => {
    let dogData
    let dogPromise

    beforeEach(() => {
        sinon.stub(dogRepository, 'create')
      })

    
    context('when the dog data is valid', () => {
        let dog

      beforeEach(() => {
        // given
        dogData = { name: 'Rex', age: 12 }
        dog = new Dog({id : 1 , name : 'Rex', age: 12})
        dogRepository.create.resolves(dog)
        // when
        dogPromise= dogsService.create(dogData)


      })

      it('should call the dog Repository with the creation data', async () => {
        // then
        await dogPromise
        expect(dogRepository.create).to.have.been.calledWith(dogData)
      })
      it('should resolve with the created dog from repository', () => {
        // then
        return expect(dogPromise).to.eventually.equal(dog)
      })
    })

    context('when the dog name is missing', () => {

      beforeEach(() => {
        // given
        dogData = { name: '', age: 12 }
        // when
        dogPromise= dogsService.create(dogData)
      })

      it('should not call the dog Repository', async () => {
        // then
        await dogPromise.catch(()=>{})
    
        expect(dogRepository.create).to.not.have.been.called
        
      })
      it('should reject with a missing NameCantBeEmptyError error', () => {
        // then
        return expect(dogPromise).to.eventually.be.rejectedWith(NameCantBeEmptyError)
      })
    })
    context('when the dog age is missing', () => {

        beforeEach(() => {
          // given
          dogData = { name: 'Rex' }
          // when
          dogPromise= dogsService.create(dogData)
        })
  
        it('should not call the dog Repository', async () => {
          // then
          await dogPromise.catch(()=>{})
      
          expect(dogRepository.create).to.not.have.been.called
          
        })
        it('should reject with a missing AgeCantBeEmptyError error', () => {
          // then
          return expect(dogPromise).to.eventually.be.rejectedWith(AgeCantBeEmptyError)
        })
      })
    context('when the dog age is not a number', () => {

        beforeEach(() => {
            // given
            dogData = { name: 'Rex',age:'lol' }
            // when
            dogPromise= dogsService.create(dogData)
        })

        it('should not call the dog Repository', async () => {
            // then
            await dogPromise.catch(()=>{})
        
            expect(dogRepository.create).to.not.have.been.called
            
        })
        it('should reject with a missing AgeCantNotBeANumberError error', () => {
            // then
            return expect(dogPromise).to.eventually.be.rejectedWith(AgeCantNotBeANumberError)
        })
    })
    context('when the dog age is a negative number', () => {

        beforeEach(() => {
            // given
            dogData = { name: 'Rex',age:-5 }
            // when
            dogPromise= dogsService.create(dogData)
        })

        it('should not call the dog Repository', async () => {
            // then
            await dogPromise.catch(()=>{})
        
            expect(dogRepository.create).to.not.have.been.called
            
        })
        it('should reject with a missing AgeCantNotBeANumberError error', () => {
            // then
            return expect(dogPromise).to.eventually.be.rejectedWith(AgeCantBeNegativeError)
        })
    })
  })
})