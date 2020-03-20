const dogsRepository = require('../repositories/dogRepository')
const dogsService = require('../services/dogService')
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
router.get('/:id', function (req, res, next) {
    const dogId = req.params.id
    dogsRepository.get(dogId)
        .then((dog) => {
            res.render('dogs/id-dog', { dog })
        })
        .catch(next)
})

router.post('/', function (req, res, next) {
   const dogData = { name: req.body['name'], age: req.body['age'] }
    dogsService.create(dogData)
        .then((createdDog) => {
            res.redirect('dogs/'+createdDog.id)
        })
        .catch(next)
})



module.exports = router
