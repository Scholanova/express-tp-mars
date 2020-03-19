const { expect } = require('../testHelper')

const calculusService = require('../../lib/services/calculusService')
const { NotEvenResultError, NegativeResultError } = require('../../lib/errors');

describe('calculusService', () => {

  describe('sum', () => {
    let operand1
    let operand2
    let sumPromise

    context('when the two operands sum to a even number', () => {

      beforeEach(() => {
        // given
        operand1 = 1
        operand2 = 3

        // when
        sumPromise = calculusService.sum(operand1, operand2)
      })

      it('should return the sum', () => {
        // then
        const expectedSum = operand1 + operand2
        return expect(sumPromise).to.eventually.equal(expectedSum)
      })
    })

    context('when the two operands sum to a odd number', () => {

      beforeEach(() => {
        // given
        operand1 = 1
        operand2 = 2

        //when
        sumPromise = calculusService.sum(operand1, operand2)
      })

      it('should throw NotEventResultError', () => {
        // when
        return expect(sumPromise).to.eventually.be.rejectedWith(NotEvenResultError)
      })
    })
  })

  describe('sum', () => {
    let operand1
    let operand2
    let sumPromise

    context('when the two operands sum equal op1 - op2', () => {

      beforeEach(() => {
        // given
        operand1 = 4
        operand2 = 2

        // when
        subPromise = calculusService.sub(operand1, operand2)
      })

      it('should return the sum', () => {
        // then
        const expectedSum = operand1 - operand2
        return expect(subPromise).to.eventually.equal(expectedSum)
      })
    })

    context('when the two operands sum equal negative', () => {

      beforeEach(() => {
        // given
        operand1 = 2
        operand2 = 4

        // when
        subPromise = calculusService.sub(operand1, operand2)
      })

      it('should throw an error', () => {
        // then
        return expect(subPromise).to.eventually.be.rejectedWith(NegativeResultError)
      })
    })
  })
})
