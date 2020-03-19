const { expect } = require('../testHelper')

const calculusService = require('../../lib/services/calculusService')
const { NotEvenResultError } = require('../../lib/errors')

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

    context('when the two operands sum to an odd number', () => {

      beforeEach(() => {
        // given
        operand1 = 1
        operand2 = 2

        // when
        sumPromise = calculusService.sum(operand1, operand2)
      })

      it('should throw an not even error', () => {
        // then
        return expect(sumPromise).to.eventually.be.rejectedWith(NotEvenResultError)
      })
    })
  })
})
