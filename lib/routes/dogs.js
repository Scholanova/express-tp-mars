const calculusService = require('../services/calculusService')
const dogsRepository = require('../repositories/dogRepository')
const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {

  if(req.query.id){
    console.log(req.query.id)
    dogsRepository.get(req.query.id)
    .then((dog) => {
      res.render('dogs/dog',{dog})
    })
    .catch()

  }else{
    dogsRepository.listAll()
    .then((dogs) => {
      res.render('dogs/list', { dogs })
    })
    .catch(next)
  }
  
  
})
module.exports = router
