const { expect, sinon } = require('../testHelper')

const dogRepository = require('../../lib/repositories/dogRepository')

describe('dogRepository', () => {

  describe('listAll', () => {
    let result

    context('when there is no dogs in the repository', () => {

      beforeEach(async () => {
        // given

        // when
        result = await dogRepository.listAll()
      })

      it('should return an empty list', () => {
        // then
        expect(result).to.be.empty
      })
    })

    context('when there is a dog in the repository', () => {

      let dog

      beforeEach(async () => {
        // given
        dog = await dogRepository.create({ name: 'Rex', age: 12 })

        // when
        result = await dogRepository.listAll()
      })

      it('should return a list with the dog', () => {
        // then
        const dogValue = dog.get()
        const resultValues = result.map((dog) => dog.get())
        expect(resultValues).to.deep.equal([dogValue])
      })
    })
  })
})
