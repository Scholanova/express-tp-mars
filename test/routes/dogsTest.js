const { expect, request, sinon } = require('../testHelper')
const { RessourceNotFoundError } = require('../../lib/errors')
const app = require('../../lib/app')
const dogRepository = require('../../lib/repositories/dogRepository')
const models = require('../../lib/models')
const Dog = models.Dog

describe('dogRoutes', () => {

  describe('list', () => {

    let response

    beforeEach(() => {
      sinon.stub(dogRepository, 'listAll')
    })

    context('when there is no dogs in the repository', () => {

      beforeEach(async () => {
        // given
        dogRepository.listAll.resolves([])

        // when
        response = await request(app).get('/dogs')
      })

      it('should succeed with a status 200', () => {
        // then
        expect(response).to.have.status(200)
      })

      it('should return an empty list message', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain('No dogs')
      })
    })

    context('when there are dogs in the repository', () => {

      beforeEach(async () => {
        // given
        const dog = new Dog({ name: 'Rex', age: 12 })
        dogRepository.listAll.resolves([dog])

        // when
        response = await request(app).get('/dogs')
      })

      it('should succeed with a status 200', () => {
        // then
        expect(response).to.have.status(200)
      })

      it('should return an html list with dog info inside', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain('Rex - 12')
      })
    })

    // context('when there is a dog in the repository', () => {
    //
    //   let dog
    //
    //   beforeEach(async () => {
    //     // given
    //     dog = await dogRepository.create({ name: 'Rex', age: 12 })
    //
    //     // when
    //     result = await dogRepository.listAll()
    //   })
    //
    //   it('should return a list with the dog', () => {
    //     // then
    //     const dogValue = dog.get()
    //     const resultValues = result.map((dog) => dog.get())
    //     expect(resultValues).to.deep.equal([dogValue])
    //   })
    // })
  })

  describe('show', () => {

    let dogId
    let response

    beforeEach(() => {
      sinon.stub(dogRepository, 'get')
    })

    context('when there is no dog matching in the repository', () => {

      beforeEach(async () => {
        // given
        dogId = '123'
        dogRepository.get.rejects(this.RessourceNotFoundError())

        // when
        response = await request(app).get(`/dogs/${dogId}`)
      })

      it('should call the repository with id', () => {
        // then
        expect(dogRepository.get).to.have.been.calledWith(dogId)
      })

      it('should succeed with a status 404', () => {
        // then
        expect(response).to.have.status(404)
      })

      it('should return the resource not found page', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain('Resource not found')
      })
    })


    context('when there is no dog matching in the repository', () => {

      let dog
      beforeEach(async () => {
        // given
        dogId = '123'
        dog = new Dog({ id: dogId, name: 'Rex', age: 12 })

        dogRepository.get.resolves(dog)

        // when
        response = await request(app).get(`/dogs/${dogId}`)
      })

      it('should call the repository with id', () => {
        // then
        expect(dogRepository.get).to.have.been.calledWith(dogId)
      })

      it('should succeed with a status 200', () => {
        // then
        expect(response).to.have.status(200)
      })

      it('should return the show page with the dog’s info', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain(`Dog n°${dogId}`)
        expect(response.text).to.contain(`${dog.name} - ${dog.age}`)
      })
    })
  })
})