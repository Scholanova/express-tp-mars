const { expect, request, sinon } = require('../testHelper')
const app = require('../../lib/app')
const dogRepository = require('../../lib/repositories/dogRepository')
const dogsService = require('../../lib/services/dogsService')
const models = require('../../lib/models')
const { NameMustBeFilled, AgeMustBeFilled, AgeMustBePositive } = require('../../lib/errors')
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

  describe('getOne', () => {

    let response

    beforeEach(() => {
      sinon.stub(dogRepository, 'get')
    })

    context('when there is no dog with that Id', () => {

      beforeEach(async () => {
        // when
        dogRepository.get.resolves(null)
        response = await request(app).get('/dogs/1')
      })

      it('should return status 404', () => {
        // then
        expect(response).to.have.status(404)
      })
    })

    context('when there is a dog with that Id', () => {
      beforeEach(async () => {
        // given
        const dog = new Dog({ name: 'Rex', age: 12 })
        dogRepository.get.resolves(dog)

        // when
        response = await request(app).get('/dogs/1')
      })

      it('should succeed with a status 200', () => {
        // then
        expect(response).to.have.status(200)
      })

      it('should return a dog', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain('Rex - 12')
      })
    })
  })

  describe('post Create', () => {

    let response

    beforeEach(() => {
      sinon.stub(dogsService, 'create')
    })

    context('when post a valid dog', () => {

      beforeEach(async () => {
        // when
        dogs = new Dog({name: 'jean', age: 6})
        dogsService.create.resolves(dogs)
        response = await request(app).post('/dogs/create').type('form').send({ '_method': 'post', 'name': 'jean', 'age': '6' })
      })

      it('should return status 404', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain('jean - 6')
      })
    })

    context('when post an dog without name', () => {
      beforeEach(async () => {
        // when
        dogs = new Dog({name: '', age: 6})
        dogsService.create.rejects(new NameMustBeFilled())
        response = await request(app).post('/dogs/create').type('form').send({ '_method': 'post', 'name': '', 'age': '6' })
      })

      it('should return an notification in the form', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain('Name must be filled')
      })
    })

    context('when post an dog without age', () => {
      beforeEach(async () => {
        // when
        dogs = new Dog({name: '', age: 6})
        dogsService.create.rejects(new AgeMustBeFilled())
        response = await request(app).post('/dogs/create').type('form').send({ '_method': 'post', 'name': 'jean', 'age': '' })
      })

      it('should return an notification in the form', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain('Age must be filled')
      })
    })

    context('when post an dog with age < 0 ', () => {
      beforeEach(async () => {
        // when
        dogs = new Dog({name: '', age: 6})
        dogsService.create.rejects(new AgeMustBePositive())
        response = await request(app).post('/dogs/create').type('form').send({ '_method': 'post', 'name': 'jean', 'age': '0' })
      })

      it('should return an notification in the form', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain('Age must be positive')
      })
    })
  })
})
