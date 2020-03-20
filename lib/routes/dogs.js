const { DogNotFoundError } = require('../errors')

const dogsRepository = require('../repositories/dogRepository')
const dogsService = require('../services/dogsService')
const express = require('express')
const router = express.Router()


router.get('/new', function (req, res, next) {
  res.render('dogs/new')
})

router.post('/new', function (req, res, next) {
  dogsService.create({name:req.body['name'],age:parseInt(req.body['age'])})
    .then((result) => {
      res.redirect('/dogs/' + result.id)
    })
    .catch(next)
})

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
