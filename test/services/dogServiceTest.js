const { expect } = require('../testHelper')

const dogsService = require('../../lib/services/dogsService')
const dogRepository = require('../../lib/repositories/dogRepository')
const { NameCantBeEmptyError,AgeCantBeEmptyError,AgeCantbeNegativeError,ValidationError  } = require('../../lib/errors')
const Dog = require('../../lib/models').Dog

describe('dogService', () => {

  describe('create', () => {
    let dogData
    beforeEach(() => {
        sinon.stub(dogRepository, 'create')
      })

    
    context('when the dog data is valid', () => {

      beforeEach(() => {
        // given
        dogData = { name: 'Rufus', age: 9 }
        // when
        dogPromise= dogsService.create(dogData)
      })

      it('should call the dog Repository with the creation data', () => {
        // then
        expect(dogRepository.create).to.have.been.calledWith(dogData)
      })
      it('should resolve with the created dog from repository', () => {
        // then
        const expectedDog = { name: 'Rufus', age: 9 }
        return expect(dogPromise).to.eventually.equal(expectedDog)
      })
    })

    context('when the dog data is missing a name', () => {

      beforeEach(() => {
        // given
        dogData = { name: '', age: 9 }
        // when
        dogPromise= dogsService.create(dogData)
      })

      it('should not call the dog Repository', () => {
        // then
        expect(dogRepository.create).to.not.have.been.calledWith(dogData)
      })
      it('should reject with a missing parameter error', () => {
        // then
      })
    })
    context('when the dog data is missing properties', () => {

        beforeEach(() => {
          // given
          dogData = { name: undefined, age: undefined }
  
          // when
          dogCreationPromise = dogService.create(dogData)
        })
  
        it('should not call the dog Repository', async () => {
          // then
          await dogCreationPromise.catch(() => {})
          expect(dogRepository.create).to.not.have.been.called
        })
        it('should reject with a missing parameter error', () => {
          // then
          const expectedError = new ValidationError()
          expectedError.addFailedField('name', 'cannot be empty')
          expectedError.addFailedField('age', 'cannot be empty')
  
          return expect(dogCreationPromise)
            .to.eventually.be.rejectedWith(ValidationError)
            .with.deep.property('failedFields', expectedError.failedFields)
        })
    })
    context('when the dog age is not a number', () => {

        beforeEach(() => {
          // given
          dogData = { name: 'Rex', age: 'not a number' }
  
          // when
          dogCreationPromise = dogService.create(dogData)
        })
  
        it('should not call the dog Repository', async () => {
          // then
          await dogCreationPromise.catch(() => {})
          expect(dogRepository.create).to.not.have.been.called
        })
        it('should reject with a age must be a number error', () => {
          // then
          const expectedError = new ValidationError()
          expectedError.addFailedField('age', 'must be a number')
  
          return expect(dogCreationPromise)
            .to.eventually.be.rejectedWith(ValidationError)
            .with.deep.property('failedFields', expectedError.failedFields)
        })
    })

    context('when the dog age is negative', () => {

        beforeEach(() => {
          // given
          dogData = { name: 'Rex', age: '-12' }
  
          // when
          dogCreationPromise = dogService.create(dogData)
        })
  
        it('should not call the dog Repository', async () => {
          // then
          await dogCreationPromise.catch(() => {})
          expect(dogRepository.create).to.not.have.been.called
        })
        it('should reject with a age cannot be negative error', () => {
          // then
          const expectedError = new ValidationError()
          expectedError.addFailedField('age', 'cannot be negative')
  
          return expect(dogCreationPromise)
            .to.eventually.be.rejectedWith(ValidationError)
            .and.to.have.deep.property('failedFields', expectedError.failedFields)
        })
      })

  })
})