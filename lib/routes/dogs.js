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

router.get('/new', function (req, res, next) {
  res.render('dogs/new')
})


router.post('/', function (req, res, next) {
console.log("test");
var dogs = {
  name: req.body['nam'],
  age: req.body['age'],
};
console.log(dogs);
 dogsRepository.create(dogs)
    .then((result) => {
           res.render('dogs/list', { result })
    })
    .catch(next)
})

module.exports = router
