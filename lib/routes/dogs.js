const dogService = require('../services/dogService')
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

router.post('/', function (req, res, next) {
  let dogData = { name: req.body['name'], age: req.body['age'] }
  dogService.create(dogData)
    /*.then((dogData) => {
      //res.cookie('calculus_result', result)
      redirect('/')
    })
    .catch(next)*/
})

router.get('/new', function (req, res, next) {
  res.render('dogs/new')
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