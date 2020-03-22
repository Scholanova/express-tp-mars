const dogRepository = require('../repositories/dogRepository')
const dogService = require('../services/dogService')
const router = require('express').Router()
const { ValidationError } = require('../errors')

router.get('/', function (req, res, next) {
  dogRepository.listAll()
    .then((dogs) => {
    	console.log("dogsssss" + dogs);
      res.render('dogs/list', { dogs })
    })
    .catch(next)
})

router.get('/new', function (req, res, next) {
  res.render('dogs/new')
})

router.post('/new', function (req, res, next) {
  const dogData = {
    name: req.body['name'],
    age: req.body['age']
  }
  return dogService.create(dogData)
    .then((dog) => {
      res.redirect(`/dogs/${dog.id}`)
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        res.render('dogs/new', {
          values: {
            name: req.body['name'],
            age: req.body['age']
          },
          failedFields: error.failedFields
        })
      } else {
        next(error)
      }
    })
})

router.get('/:id', function (req, res, next) {
  const dogId = req.params.id

  dogRepository.get(dogId)
    .then((dog) => {
      res.render('dogs/show', { dog })
    })
    .catch(next)
})

router.get('/new', function (req, res, next) {
  res.render('dogs/new')
})


router.post('/', function (req, res, next) {
var dogs = {
  name: req.body['nam'],
  age: req.body['age'],
};
console.log(dogs);
 dogsRepository.create(dogs)
    .then((dog) => {
           res.render('dogs/show', { dog })
    })
    .catch(next)
})

router.get('/:id', function (req, res, next) {
  const dogId = req.params.id

  dogsRepository.get(dogId)
    .then((dog) => {
      res.render('dogs/show', { dog })
    })
    .catch(next)
})


module.exports = router
