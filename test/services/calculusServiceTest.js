const { expect } = require('../testHelper')

const calculusService = require('../../lib/services/calculusService')
const { NotEvenResultError, NegativeResultError } = require('../../lib/errors');

describe('calculusService', () => {

  describe('sum', () => {

    let operand1
    let operand2
    let sumPromise

    beforeEach(() => {
      // given
      operand1 = 1
      operand2 = 3

      // when
      result = calculusService.sum(operand1, operand2)
    })

    it('should return the sum', () => {
      // then
      const expectedSum = operand1 + operand2
      return expect(result).to.eventually.equal(expectedSum)
    })
  })

  context('when the two operands sum to a odd number', () => {
    
    beforeEach(() => {
      // given
      operand1 = 1
      operand2 = 2
      result = operand1 + operand2
    })

    it('should throw NotEventResultError', () => {
      // when & then
      return expect(calculusService.sum(operand1, operand2)).to.eventually.be.rejectedWith(NotEvenResultError)
    })

  })

  context('when the two operands substract to a even number', () => {

    beforeEach(() => {
      // given
      operand1 = 3
      operand2 = 1
      
      // when
      result = calculusService.substract(operand1, operand2)
    })

    it('should return the sum', () => {
      // then
      const expectedSum = operand1 - operand2
      return expect(result).to.eventually.equal(expectedSum)
    })

  })

  context('when two operands substract to a positive number', () => {

    beforeEach(() => {
      // given
      operand1 = 4
      operand2 = 1
      result = operand1 - operand2
    })

    it('should throw NotEventResultError', () => {
      // when & then
      return expect(calculusService.substract(operand1, operand2)).to.eventually.equal(result)
    })

  })

  context('when two operands substract to a negative number', () => {

    beforeEach(() => {
      // given
      operand1 = 1
      operand2 = 4
      result = operand1 - operand2
    })

    it('should throw NotEventResultError', () => {
      // when & then
      return expect(calculusService.substract(operand1, operand2)).to.eventually.be.rejectedWith(NegativeResultError)
    })

  })
})