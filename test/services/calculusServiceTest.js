const { expect } = require('../testHelper')

const calculusService = require('../../lib/services/calculusService')
const { NotEvenResultError, NegativeResultError } = require('../../lib/errors')

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
        const expectedResult = operand1 + operand2
        return expect(sumPromise).to.eventually.equal(expectedResult)
      })
    })

    context('when the two operands sum to an odd number', () => {
      
      beforeEach(() => {
        //given
        operand1 = 1
        operand2 = 2

        //when
        sumPromise = calculusService.sum(operand1, operand2) 
      })

      it('should throw a not even error', () => {
        //then
        return expect(sumPromise).to.eventually.be.rejectedWith(NotEvenResultError)
      })
    })
  })

  describe('substract', () => {
    let operand1
    let operand2
    let substractPromise
  
    context('when the two operands substract to a positive number', () => {
      
      beforeEach(() => {
        //given
        operand1 = 2
        operand2 = 1

        //when 
        substractPromise = calculusService.substract(operand1, operand2)
      })

      it('should return the substraction', () => {
        //then
        const expectedResult = operand1 - operand2
        return expect(substractPromise).to.eventually.equal(expectedResult)
      })
    })

    context('when the two operands substract to a negative result', () => {
       
      beforeEach(() =>{
        //given 
        operand1 = 4
        operand2 = 7

        //when
        substractPromise = calculusService.substract(operand1, operand2)
      })

      it('should throw a negative error', () => {
        //then 
        return expect(substractPromise).to.eventually.be.rejectedWith(NegativeResultError)
      })
    })
  })
})
