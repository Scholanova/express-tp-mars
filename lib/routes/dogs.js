const dogService = require('../services/dogService')
const dogsRepository = require('../repositories/dogRepository')
const express = require('express')
const router = express.Router()

/*show(id)
{
  redirect('/:id')
}*/

router.get('/', function (req, res, next) {
  dogsRepository.listAll()
    .then((dogs) => {
      res.render('dogs/list', { dogs })
    })
    .catch(next)
})

router.post('/', function (req, res, next) {
  //res.render('dogs/new')
  let dogData = { name: req.body['name'], age: req.body['age'] }
  dogService.create(dogData)
    .then(dog => {
      //const dogId = req.dogData.id
      res.render('dogs/show', { dog })
      //redirect('/')
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
      res.render('dogs/show', { dog })
    })
    .catch(next)
})

module.exports = router