const { NotEvenResultError } = require('../errors')

const calculusService = {
  sum: (operand1, operand2) => {
    return Promise.resolve([operand1, operand2])
      .then(([operand1, operand2]) => {
        return parseInt(operand1) + parseInt(operand2)
      })
      .then((result) => {
        if (result % 2 !== 0) {
          throw new NotEvenResultError(result)
        }
        return result
      })
  }
}

module.exports = calculusService
