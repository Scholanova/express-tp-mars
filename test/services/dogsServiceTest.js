const { expect } = require('../testHelper')

const dogService = require('../../lib/services/dogsService')
const { NegativeResultError, NotEvenResultError } = require('../../lib/errors')

describe('dogService', () => {

  describe('create', () => {

    context('when the dog data is valid', () => {

      beforeEach(() => {
        // given
        dogData = { name: 'Rex', age: 12 }

        // when
        createdDog =  await dogService.create(dogData)
      })

      it('should call the dog Repository with the creation data', () => {
        // then
        doggo = {name: 'poppy', age: '3'}
      })
      it('should resolve with the created dog from repository', () => {
        // then
      })
    })

    context('when the dog data is missing a name', () => {

      beforeEach(() => {
        // given
        dogData = { name: '', age: 12 }

        // when
        createdDog =  await dogService.create(dogData)
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