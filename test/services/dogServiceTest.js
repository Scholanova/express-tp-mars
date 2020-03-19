const { expect, sinon } = require('../testHelper')

const dogService = require('../../lib/services/dogService')
const dogRepository = require('../../lib/repositories/dogRepository');
const { MissingFieldsError, LowerThanZeroError, FloatingValueError } = require('../../lib/errors');

describe('dogService', () => {

  let createdDog
  let retrieveDog
  let dogData

  context('when the data are correct', () => {

	beforeEach(async () => {
	  // given
	  dogData = { name: 'Rex', age: 12 }

	  // when
	  createdDog = await dogRepository.create(dogData);
	  retrieveDog = await dogRepository.get(dogData.id);
	})

	it('should return the created dog', () => {
	  // then
	  const createdDogValue = createdDog.get();
	  const retrieveDogValue = retrieveDog.get();

	  expect(createdDogValue.name).to.equal(dogData.name);
	  expect(createdDogValue.age).to.equal(dogData.age);
	  expect(createdDogValue.id).to.equal(retrieveDogValue.id);
	})

  })

  context('when the data are incorrect', () => {
	  
	context('when name and age are missing', () => {

		beforeEach(async () => {
			// given
			dogData = {}
		})

		it('should throw MissingFieldsError', () => {
			// when & then
			return expect(dogService.create(dogData)).to.eventually.be.rejectedWith(MissingFieldsError)
		})

	})

	context('when name is empty', () => {

		beforeEach(async () => {
			// given
			dogData = { name: '', age: 12 }
		})

		it('should throw MissingFieldsError', () => {
			// when & then
			return expect(dogService.create(dogData)).to.eventually.be.rejectedWith(MissingFieldsError)
		})
		
	})

	context('when age is lower than zero', () => {

		beforeEach(async () => {
			// given
			dogData = { name: 'Rex', age: -1 }
		})

		it('should throw LowerThanZeroError', () => {
			// when & then
			return expect(dogService.create(dogData)).to.eventually.be.rejectedWith(LowerThanZeroError)
		})
		
	})

  })

})