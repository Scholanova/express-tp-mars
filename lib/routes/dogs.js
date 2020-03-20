const calculusService = require('../services/calculusService')
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

router.get('/:id', function (req, res, next) {
  dogsRepository.get(req.params.id)
    .then( dog => {
      if ( dog ) {
        res.render('dogs/dog', { dog })
      } else {
        throw(new Error(`Dog ${req.params.id} not found`))
      }
    })
    .catch(next)
})

router.post('/', function (req, res, next) {
  dogsRepository.create(req.body['dog']).then((result) => {
    console.log(req)
    console.log(result)
    res.render('dogs/list', { dogs })
  })
})

module.exports = router
