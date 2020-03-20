const { expect, request, sinon } = require('../testHelper')
const app = require('../../lib/app')
const dogRepository = require('../../lib/repositories/dogRepository')
const dogsService = require('../../lib/services/dogsService')
const models = require('../../lib/models')
const Dog = models.Dog
const { DogNotFoundError } = require('../../lib/errors')
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

    context('when there is no dogs in the repository', () => {

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
  })
  describe('id', () => {
    let dogId
    let response

    beforeEach(() => {
      sinon.stub(dogRepository, 'get')
    })

    context('when the id dogs not in the repository', () => {
      dogId = '1'
      beforeEach(async () => {
        // given
        dogRepository.get.rejects(new DogNotFoundError())

        // when
        response = await request(app).get(`/dogs/${dogId}`)
      })

      it('should call the repository with id', () => {
        // then
        expect(dogRepository.get).to.have.been.calledWith(dogId)
      })

      it('should failed with a status 404', () => {
        // then
        expect(response).to.have.status(404)
      })

      it('should return an empty list message', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain('This page does not exist')
      })
    })
    context('when the id dogs is in the repository', () => {
      dogId = '2'
      beforeEach(async () => {
        // given
        const dog = new Dog({ name: 'Rex', age: 12 })
        dogRepository.get.resolves(dog)

        // when
        response = await request(app).get(`/dogs/${dogId}`)
      })

      it('should call the repository with id', () => {
        // then
        expect(dogRepository.get).to.have.been.calledWith(dogId)
      })

      it('should success with a status 200', () => {
        // then
        expect(response).to.have.status(200)
      })

      it('should return an empty list message', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain('Rex - 12')
      })
    })

  })

  describe('new', () => {
    let dogData
    let response

    beforeEach(() => {
      sinon.stub(dogsService, 'create')
    })

    context('when the parameters are good', () => {
      dogData = {name:'Rex',age:12}
      beforeEach(async () => {
         // given
         const dog = new Dog({ id:5, name: 'Rex', age: 12 })
         dogsService.create.resolves(dog)
 
         // when
         response = await  request(app).post('/dogs/new')
                                    .type('form')
                                    .send({
                                      'name':'Rex',
                                      'age':12
                                    })
      })

      it('should call the service with dogData', () => {
        // then
        expect(dogsService.create).to.have.been.calledWith(dogData)
      })

      it('should success with a status 200', () => {
        // then
        expect(response).to.have.status(200)
      })

      it('should return an empty list message', () => {
        // then
        expect(response).to.redirectTo(`/dogs/${dog.id}`);
        expect(response.text).to.contain('Rex - 12')
      })
    })
  })
})
