const { expect,sinon } = require('../testHelper')
const dogService = require('../../lib/services/dogService')
const dogRepository = require('../../lib/repositories/dogRepository')
const models = require('../../lib/models')
const Dog = models.Dog
const { RequiredFieldsError, NoEmptyFieldError,NameCannotBeNumberError,AgeMustBeNumberError, NegativeAgeError } = require('../../lib/errors');

describe('dogService', () => {

    let dogData
    let dog
    //let createdDog
    let getDogPromise

    beforeEach(() => {
        sinon.stub(dogRepository,'create');
    })

  describe('create', () => {

    context('when the dog data is valid', () => {

      beforeEach(() => {
        // given
        dogData = { name: 'Rex', age: 12 }
        dog= new Dog({id:1,name: 'Rex', age: 12})
        dogRepository.create.resolves(dog)
        
        // when
        //createdDog =  await dogService.create(dogData)
        getDogPromise = dogService.create(dogData)
      })

      it('should call the dog Repository with the creation data', async () => {
        // then
        await getDogPromise
        expect(dogRepository.create).to.have.been.calledWith(dogData)
      })
      it('should resolve with the created dog from repository', () => {
        // then
        return expect(getDogPromise).to.eventually.be.equal(dog)
      })
    })

    context('when the dog data is missing a name', () => {

      beforeEach(() => {
        // given
        dogData = { name:"", age: 12 }
        // when
        //createdDog =  await dogService.create(dogData)
        getDogPromise = dogService.create(dogData)
      })

      it('should not call the dog Repository', async () => {
        // then
        await getDogPromise.catch(()=>{})  //i.e try{await getDogPromise}catch{}
        expect(dogRepository.create).to.not.have.been.called
      })
      it('should reject with a missing parameter error', async() => {
        // then
        await getDogPromise.catch(()=>{})
        return expect(getDogPromise).to.eventually.be.rejectedWith(NoEmptyFieldError)
      })
    })

    context('when the dog data is missing both name and age ', () => {

        beforeEach(() => {
          // given
          dogData = { name:"", age:"" }
          // when
          //createdDog =  await dogService.create(dogData)
          getDogPromise = dogService.create(dogData)
        })
  
        it('should not call the dog Repository', async () => {
          // then
          await getDogPromise.catch(()=>{})  //i.e try{await getDogPromise}catch{}
          expect(dogRepository.create).to.not.have.been.called
        })
        it('should reject with a FieldsRequired error', async() => {
          // then
          await getDogPromise.catch(()=>{})
          return expect(getDogPromise).to.eventually.be.rejectedWith(RequiredFieldsError)
        })
      })
    })

    context('when the name of the dog is a number ', () => {

        beforeEach(() => {
          // given
          dogData = { name:2, age:3 }
          // when
          //createdDog =  await dogService.create(dogData)
          getDogPromise = dogService.create(dogData)
        })
  
        it('should not call the dog Repository', async () => {
          // then
          await getDogPromise.catch(()=>{})  //i.e try{await getDogPromise}catch{}
          expect(dogRepository.create).to.not.have.been.called
        })
        it('should reject with a NameCannotBeNumberError error', async() => {
          // then
          await getDogPromise.catch(()=>{})
          return expect(getDogPromise).to.eventually.be.rejectedWith(NameCannotBeNumberError)
        })
    })

    context('when the age of the dog is not a number ', () => {

        beforeEach(() => {
          // given
          dogData = { name:"Rex", age:"deux" }
          // when
          //createdDog =  await dogService.create(dogData)
          getDogPromise = dogService.create(dogData)
        })
  
        it('should not call the dog Repository', async () => {
          // then
          await getDogPromise.catch(()=>{})  //i.e try{await getDogPromise}catch{}
          expect(dogRepository.create).to.not.have.been.called
        })
        it('should reject with a AgeMustBeNumberError error', async() => {
          // then
          await getDogPromise.catch(()=>{})
          return expect(getDogPromise).to.eventually.be.rejectedWith(AgeMustBeNumberError)
        })
    })

    context('when the age of the dog is a negative number ', () => {

        beforeEach(() => {
          // given
          dogData = { name:"Rex", age:"-3" }
          // when
          //createdDog =  await dogService.create(dogData)
          getDogPromise = dogService.create(dogData)
        })
  
        it('should not call the dog Repository', async () => {
          // then
          await getDogPromise.catch(()=>{})  //i.e try{await getDogPromise}catch{}
          expect(dogRepository.create).to.not.have.been.called
        })
        it('should reject with a NegativeAgeError error', async() => {
          // then
          await getDogPromise.catch(()=>{})
          return expect(getDogPromise).to.eventually.be.rejectedWith(NegativeAgeError)
        })
    })
})