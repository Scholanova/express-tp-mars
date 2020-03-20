const dogsService = require('../services/dogsService')
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
  if(req.params.id != 'new'){
  dogsRepository.get(req.params.id)
    .then( dog => {
      if ( dog ) {
        res.render('dogs/id', { dog })
      } else {
        next();
      }
    })
  }
  else{
    res.render('dogs/new')
  }
})

router.post('/new', function (req, res, next) {
  var dataDog = {
    name: req.body.name,
    age: req.body.age
  }
  dogsService.create(dataDog)
    .then((dogs) => {
      res.redirect('/dogs/')
    }) 
    .catch(next)
})

module.exports = router
