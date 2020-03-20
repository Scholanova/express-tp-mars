const calculusService = require('../services/calculusService')
const dogsService = require('../services/dogService')
const dogsRepository = require('../repositories/dogRepository')
const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  dogsRepository.listAll()
    .then((dogs) => {
      res.render('dogs/list', { dogs })
    })
    .catch(next)
})

router.get('/new', function(req, res, next) {
  res.render('dogs/new', { errors: {} })
})

router.post('/new', function(req, res, next) {
  dogsService.create({name: req.body.name, age: req.body.age })
    .then( dog => {
      res.redirect(`/dogs/${dog.id}`)
    })
    .catch( err => {
      let errors = Object.fromEntries(err.failedFields.map( e => [e.fieldName, e.errorMessage]))
      console.log(errors)
      res.render('dogs/new', { errors })
    })
})

router.get('/:id', function (req, res, next) {
  dogsRepository.get(req.params.id)
    .then((dog) => {
      res.render('dogs/show', { dog })
    })
    .catch(next)
})

module.exports = router
