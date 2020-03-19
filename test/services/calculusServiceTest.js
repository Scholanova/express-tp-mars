const { expect, sinon } = require('../testHelper')

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
  }),
  context('when the two operands sum to a odd number', () => {

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
  }),
  context('when the two operands sub to a number', () => {

    beforeEach(async () => {
      // given
      operand1 = 9
      operand2 = 4

      // when
      result = await calculusService.sub(operand1, operand2)
    })

    it('should return the subtract', () => {
      // then
      const expectedSub = operand1 - operand2
      expect(result).to.be.equal(expectedSub)
    })
  })
})
