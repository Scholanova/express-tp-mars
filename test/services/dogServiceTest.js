const { expect, sinon } = require('../testHelper')

const dogService = require('../../lib/services/dogService')
const dogRepository = require('../../lib/repositories/dogRepository')
const { ValidationError } = require('../../lib/errors')
const Dog = require('../../lib/models').Dog

describe('dogService', () => {

    describe('create', () => {

        let dogData
        let dogCreationPromise

        beforeEach(() => {
            sinon.stub(dogRepository, 'create')
        })

        context('when the dog data is valid', () => {

            let dog
            beforeEach(() => {
                // given
                dogData = { name: 'Rex', age: '12' }
                dog = new Dog({ id: 1, name: 'Rex', age: 12 })
                dogRepository.create.resolves(dog)

                // when
                dogCreationPromise = dogService.create(dogData)
            })

            it('should call the dog Repository with the creation data', async () => {
                // then
                await dogCreationPromise.catch(() => {})
                expect(dogRepository.create).to.have.been.calledWith(dogData)
            })
            it('should resolve with the created dog from repository', () => {
                // then
                return expect(dogCreationPromise)
                    .to.eventually.equal(dog)
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