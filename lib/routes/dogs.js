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

router.get('/:dogId', function (req, res, next) {
  dogsRepository.get(req.params.dogId)
    .then((dog) => {
      if (dog === null) {
        res.status(404);
        res.render('errors/404');
      }
      res.render('dogs/getOne', { dog })
    })
    .catch(next)
})

module.exports = router
