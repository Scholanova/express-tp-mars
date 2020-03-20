const { expect, request, sinon } = require('../testHelper')
const app = require('../../lib/app')
const dogRepository = require('../../lib/repositories/dogRepository')
const models = require('../../lib/models')
const Dog = models.Dog

describe('dogServices', () => {
    
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
