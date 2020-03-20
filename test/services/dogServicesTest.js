const { expect, request, sinon } = require('../testHelper')
const app = require('../../lib/app')
const dogRepository = require('../../lib/repositories/dogRepository')
const models = require('../../lib/models')
const dogService = require('../../lib/services/dogService')
const { NullDogResultError, ParamIsMissingError } = require('../../lib/errors');
const Dog = models.Dog

describe('dogServices', () => {
    
    describe('create', () => {

        let dogData
        let dog
        let dogPromise

        beforeEach(() => {
            sinon.stub(dogRepository, 'create');
          })

        context('when the dog data is valid', () => {
    
          beforeEach(() => {
            // given
            dogData = {name: 'Olaf', age: 4}
            dog = new Dog({id: 1, name: 'Olaf', age: 4 })
            dogRepository.create.resolves(dog)

            // when
            dogPromise = dogService.create(dogData)
        })
    
          it('should call the dog Repository with the creation data', async () => {
            // then
            await dogPromise
            expect(dogRepository.create).to.have.been.calledWith(dogData)
          })
          it('should resolve with the created dog from repository', () => {
            return expect(dogPromise).to.eventually.equal(dog)
          })
        })
    
        context('when the dog data is missing a name', () => {

            beforeEach(() => {
                // given
                dogData = {name: '', age: 4}
                
                // when
                dogPromise = dogService.create(dogData)
            })
        
            it('should not call the dog Repository', async () => {
                // then
                await dogPromise.catch(() => {})
                expect(dogRepository.create).to.have.been.not.calledWith(dogData)
            })
            it('should reject with a missing parameter error', () => {
                // then
                return expect(dogPromise).to.eventually.be.rejectedWith(ParamIsMissingError)
            })
        })

        context('when the dog data is missing a age', () => {

            beforeEach(() => {
                // given
                dogData = {name: 'Rooky', age: undefined }
                
                // when
                dogPromise = dogService.create(dogData)
            })
        
            it('should not call the dog Repository', async () => {
                // then
                await dogPromise.catch(() => {})
                expect(dogRepository.create).to.have.been.not.calledWith(dogData)
            })
            it('should reject with a missing parameter error', () => {
                // then
                return expect(dogPromise).to.eventually.be.rejectedWith(ParamIsMissingError)
            })
        })

        context('when the dog age is negative', () => {

            beforeEach(() => {
                // given
                dogData = {name: '', age: -5}
                
                // when
                dogPromise = dogService.create(dogData)
            })
        
            it('should not call the dog Repository', async () => {
                // then
                await dogPromise.catch(() => {})
                expect(dogRepository.create).to.have.been.not.calledWith(dogData)
            })
            it('should reject with a parameter error', () => {
                // then
                return expect(dogPromise).to.eventually.be.rejectedWith(ParamIsMissingError)
            })
        })
    })
})
