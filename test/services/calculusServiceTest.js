const { expect } = require('../testHelper')
const { NotEvenResultError,  MustBePositiveError} = require('../../lib/errors')

const calculusService = require('../../lib/services/calculusService')

describe('calculusService', () => {

  let operand1
  let operand2
  let result

  context('when the two operands sum to a even number', () => {

    beforeEach(async () => {
      // given
      operand1 = 1
      operand2 = 3

      // when
      result = await calculusService.sum(operand1, operand2)
    })

    it('should return the sum', () => {
      // then
      const expectedSum = operand1 + operand2
      expect(result).to.be.equal(expectedSum)
    })
  })

  context('when the two operands sum to an odd number', () => {

    beforeEach(async () => {
      // given
      operand1 = 1
      operand2 = 2

    })

    // when
    sumPromise = calculusService.sum(operand1, operand2)

    it('should return the sum', () => {
      // then
      return expect(sumPromise).to.eventually.be.rejectedWith(NotEvenResultError)
    })
  })

  context('when the two operands substract to a positive number', () => {

    beforeEach(async () => {
      // given
      operand1 = 3
      operand2 = 2

      // when
      result = await calculusService.substract(operand1, operand2)
    })

    it('should return the substract', () => {
      // then
      const expectedSubstract = operand1 - operand2
      expect(result).to.be.equal(expectedSubstract)
    })
  })

  context('when the two operands substract to a negative number', () => {

    beforeEach(async () => {
      // given
      operand1 = 1
      operand2 = 2

      // when
      substractPromise = calculusService.substract(operand1, operand2)
    })

    it('should return the substract', () => {
      // then
      return expect(substractPromise).to.eventually.be.rejectedWith(MustBePositiveError)
    })
  })
})
