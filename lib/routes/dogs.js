const { DogNotFoundError } = require('../errors')

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
  .then((dog) => {
    res.render('dogs/dog',{dog})
  })
  .catch((error) => {
    if (error instanceof DogNotFoundError){
      res.status(404)
      .render('../views/errors/404')
    }
  })
})
module.exports = router
