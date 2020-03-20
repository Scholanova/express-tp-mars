const calculusService = require('../services/calculusService')
const dogsRepository = require('../repositories/dogRepository')
const dogService = require('../../lib/services/dogService')
const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  dogsRepository.listAll()
    .then((dogs) => {
      res.render('dogs/list', { dogs })
    })
    .catch(next)
})

router.get('/new', function (req, res, next) {
  res.render('dogs/new')
})

router.post('/new', function (req, res, next) {
  dogService.create({name: req.body['Dog name'], age: parseInt(req.body['Dog age'])})
  .then((result) => {
    res.redirect('/dogs/' + result.id)
  })
  .catch(next)
})

router.get('/:id', function (req, res, next) {
  dogsRepository.get(req.params.id)
    .then( dog => {
      if ( dog ) {
        res.render('dogs/dog', { dog })
      } else {
        res.status(404).send(`Dog ${req.params.id} not found`);
      }
    })
    .catch(next)
})

module.exports = router
