const { expect } = require('../testHelper')

const dogsService = require('../../lib/services/dogsService')
const { NameCantBeEmptyError,AgeCantBeEmptyError,AgeCantbeNegativeError } = require('../../lib/errors')

describe('dogService', () => {

  describe('create', () => {
    let dogData
    beforeEach(() => {
        sinon.stub(dogRepository, 'create')
      })

    
    context('when the dog data is valid', () => {

      beforeEach(() => {
        // given
        dogData = { name: 'Rex', age: 12 }
        // when
        dogPromise= dogsService.create(dogData)
      })

      it('should call the dog Repository with the creation data', () => {
        // then
        expect(dogRepository.create).to.have.been.calledWith(dogData)
      })
      it('should resolve with the created dog from repository', () => {
        // then
        const expectedDog = { name: 'Rex', age: 12 }
        return expect(dogPromise).to.eventually.equal(expectedDog)
      })
    })

    context('when the dog data is missing a name', () => {

      beforeEach(() => {
        // given

        // when
      })

      it('should not call the dog Repository', () => {
        // then
      })
      it('should reject with a missing parameter error', () => {
        // then
      })
    })
  })
})