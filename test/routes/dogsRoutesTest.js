const { expect, request, sinon } = require('../testHelper')
const app = require('../../lib/app')
const dogRepository = require('../../lib/repositories/dogRepository')
const dogsService = require('../../lib/services/dogService')
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

  describe('dog', () => {

    let response
    let dogId

    beforeEach(() => {
      sinon.stub(dogRepository, 'get');
    })

    context('when there is a dog in the repository', () => {

      let dog

      beforeEach(async () => {
        // given
        dogId = '19'
        dog = new Dog({id: dogId, name: 'Rooky', age: 2 })
        dogRepository.get.resolves(dog)

        // when
        response = await request(app).get(`/dogs/${dog.id}`)
      })

      it('should call the repository with id', () => {
        // then
        expect(dogRepository.get).to.have.been.calledWith(dogId)
      })

      it('should succeed with a status 200', () => {
        // then
        expect(response).to.have.status(200)
      })

      it('should return an html with dog info inside', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain('Rooky - 2')
      })

    })

    context('when there is a no dog in the repository', () => {

      beforeEach(async () => {
        // given
        dogRepository.get.resolves(null)
        dogId = '1'

        // when
        response = await request(app).get(`/dogs/${dogId}`)
      })

      it('should call the repository with id', () => {
        // then
        expect(dogRepository.get).to.have.been.calledWith(dogId)
      })

      it('should return error with a status 302', () => {
        // then
        expect(response).to.have.status(404)
      })

      it('should return an html with dog info inside', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain('Dog 1 not found')
      })

    })

  })

  describe('new dog', () =>{

    beforeEach(() => {
      sinon.stub(dogRepository, 'get');
    })

    context('when the dogData post is OK', () => {

      let dogId
      let dog

      beforeEach(async () => {
        // given
        //dogId = '1'
        //dog = new Dog({id: dogId, name: 'Rooky', age: 4 })
        // dogRepository.get.resolves(dog)

        // when
        response = await request(app).post('/dogs/new').type('form').send({ '_method': 'post', 'name': 'Rooky', 'age': '4' })
      })

      it('should call the repository with id', () => {
        // then
        expect(dogRepository.get).to.have.been.calledWith(dogId)
      })

      // it('should succeed with a status 200', () => {
      //   // then
      //   expect(response).to.have.status(200)
      // })

      // it('should return an html with dog info inside', () => {
      //   // then
      //   expect(response).to.be.html
      //   expect(response.text).to.contain('Rooky - 4')
      // })

    })
  })
})
