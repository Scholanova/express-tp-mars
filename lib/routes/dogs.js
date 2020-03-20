const calculusService = require('../services/calculusService')
const dogsRepository = require('../repositories/dogRepository')
const dogService = require('../services/dogService')
const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  dogsRepository.listAll()
    .then((dogs) => {
      res.render('dogs/list', { dogs })
    })
    .catch(next)
})

router.get('/new',function(req,res,next){
  res.render('dogs/new')
})

router.post('/new',function(req,res,next) {
  dogName = req.body.Name
  dogAge = req.body.Age

  dogData = {name:dogName,age:dogAge}

  dogResult = dogService.create(dogData).then((dogResult) => {
    console.log(dogResult.id)
    res.redirect(`/dogs/${dogResult.id}`)
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
