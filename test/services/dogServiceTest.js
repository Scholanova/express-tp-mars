const { expect } = require('../testHelper')

const dogService = require('../../lib/services/dogService')
const { NegativeResultError, NotEvenResultError } = require('../../lib/errors')

describe('dogService', () => {

  describe('create', () => {
    let name
    let age
    let ajouterPromise

    context('when the dog data is valid', () => {

      beforeEach(() => {
        // given
        name= "boby"
        age= 12

        // when
        ajouterPromise= dogService.dogService(name,age)
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
