const { expect } = require('../testHelper')

const calculusService = require('../../lib/services/calculusService')
const { NegativeResultError, NotEvenResultError } = require('../../lib/errors')

describe('dogService', () => {

  describe('create', () => {

    context('when the dog data is valid', () => {

      beforeEach(() => {
        // given

        // when
      })

      it('should call the dog Repository with the creation data', () => {
        // then
      })
      it('should resolve with the created dog from repository', () => {
        // then
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
