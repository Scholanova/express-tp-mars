const { expect, request, sinon } = require('../testHelper')

const models = require('../../lib/models')
const dogsService = require('../../lib/services/dogsService')
const dogRepository = require('../../lib/repositories/dogRepository')
const Dog = models.Dog

const { NameMustBeFilled, AgeMustBeFilled, AgeMustBePositive } = require('../../lib/errors')

describe('dogsService', () => {

  describe('create', () => {

    let name
    let age
    let dogPromised

    beforeEach(() => {
      sinon.stub(dogRepository, 'create')
    })

    context('when creating a dog', () => {
      beforeEach(() => {
        // given
        name = 'Rex'
        age = 6

        dog = new Dog({id : 1, name: 'Rex', age: 6})


      // when
      dogPromised = dogsService.create(name, age)
      dogRepository.create.resolves(dog)
      })

      it('dogRepo.create should be called once', async () => {
        // then
        await dogPromised
        expect(dogRepository.create).to.have.been.calledWith({name: 'Rex', age: 6})
      })

      it('dogService must return saved dog', () => {
        // then
        return expect(dogPromised).to.eventually.equal(dog)
      })
    })

    context('when creating dog with wrong age', () => {

      beforeEach(() => {
        // given
      name = 'Rex'
      age = -1

      // when
      dogPromised = dogsService.create(name, age)
      })

      it('dogRepo.create should be called once', async () => {
        // then
        try{
        await dogPromised
        } catch(e) {}
        return dogRepository.create.should.have.not.been.called
      })

      it('should throw an not AgeMustBePositive error', () => {
        // then
        return expect(dogPromised).to.eventually.be.rejectedWith(AgeMustBePositive)
      })
    })

    context('when creating dog with no age', () => {

      beforeEach(() => {
        // given
        name = 'Rex'

      // when
      dogPromised = dogsService.create(name)
      })

      it('dogRepo.create should be called once', async () => {
        // then
        try{
        await dogPromised
        } catch(e) {}
        return dogRepository.create.should.have.not.been.called
      })

      it('should throw an not AgeMustBeFilled error', () => {
        // then
        return expect(dogPromised).to.eventually.be.rejectedWith(AgeMustBeFilled)
      })
    })

    context('when creating dog with no name', () => {

      beforeEach(() => {
        // given
        age = 6

        // when
        dogPromised = dogsService.create('', age)
      })

      it('dogRepo.create should be called once', async () => {
        // then
        try{
        await dogPromised
        } catch(e) {}
        return dogRepository.create.should.have.not.been.called
      })

      it('should throw an not NameMustBeFilled error', () => {
        // then
        return expect(dogPromised).to.eventually.be.rejectedWith(NameMustBeFilled)
      })
    })
  })
})