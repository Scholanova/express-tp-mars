const dogsRepository = require('../repositories/dogRepository')
const express = require('express')
const router = express.Router()
const dogsService = require('../services/dogsService')

router.get('/', function (req, res, next) {
  dogsRepository.listAll()
    .then((dogs) => {
      res.render('dogs/list', { dogs })
    })
    .catch(next)
})

router.get('/create', function (req, res, next) {
    res.render('dogs/create')
})

router.post('/create', function (req, res, next) {
  dogsService.create(req.body['name'], req.body['age'])
  .then((dog) => {
    res.render('dogs/getOne', { dog })
  })
  .catch((err) => {
    res.render('dogs/create', { err })
  })
})

router.get('/:dogId', function (req, res, next) {
  dogsRepository.get(req.params.dogId)
    .then((dog) => {
      if (dog === null) {
        res.status(404);
        res.render('errors/404');
      }
      res.render('dogs/getOne', { dog })
    })
    .catch(next)
})

module.exports = router
