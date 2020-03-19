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
  var idDog = req.params.id;
  dogsRepository.get(idDog)
  .then((dog) => {
    console.log(dog.toJSON())
    res.render('dogs/id', { dog })
  })
})

module.exports = router
