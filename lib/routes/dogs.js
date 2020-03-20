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

router.get('/:id', function(req, res, next) {
  const dogId = req.params.id

  dogsRepository.get(dogId)
    .then( dog => {
        res.render('dogs/show', { dog })
    })
    .catch(next)
})

module.exports = router
