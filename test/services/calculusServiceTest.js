const { expect, sinon } = require('../testHelper')

const calculusService = require('../../lib/services/calculusService')

const { NotValidResult, NotEvenResultError } = require('../../lib/errors')

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

  context('when result of addition is not pair', () => {

    beforeEach(async () => {
      // given
      operand1 = 6
      operand2 = 3

      
    })

    it('should return error', () => {
        // then
        try{
          // when
          result = calculusService.sum(operand1, operand2)
        }
        catch (e){
          if(e instanceof NotEvenResultError){
            throw e;
          }
          expect(result).to.be.equal(e.message, 'value: '+result+' is not an even value')
        }
      })
    })


  context('when the two operands substract to a even number', () => {

    beforeEach(async () => {
      // given
      operand1 = 23
      operand2 = 3

      // when
      result = await calculusService.substract(operand1, operand2)
    })
    it('should return the substract', () => {
      // then
      const expectedSubstract = operand1 - operand2
      expect(result).to.be.equal(expectedSubstract)
    })
  })

  context('when the two operands substract to a even number', () => {

    beforeEach(async () => {
      // given
      operand1 = 23
      operand2 = 3

    })
    it('should return error', () => {
      // then
      try{
        // when
        result = calculusService.substract(operand1, operand2)
      }
      catch (e){
        if(e instanceof NotValidResult){
          throw e;
        }
        expect(result).to.be.equal(e.message, 'value: '+result+' is a negative value')
      }
    })
  })
})
