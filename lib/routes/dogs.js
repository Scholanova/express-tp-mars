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
router.get('/', function (req, res, next) {
  res.render('dogs/id', {id: req.query.name, dogs })
})

module.exports = router
