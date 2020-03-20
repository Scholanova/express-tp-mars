const calculusService = require('../services/calculusService')
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

router.post('/:dogName/:dogAge', function (req, res, next) {
  var data = {
    "dog": {
        "name": req.params.dogName,
        "age": req.params.dogAge
    }
  }; 

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

router.get('/new',function(req,res,next){
  res.render('dogs/new')
})

module.exports = router
