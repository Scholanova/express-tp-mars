const calculusService = require('../services/calculusService')
const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('calculus/new')
})

router.post('/', function (req, res, next) {
  if(req.cookies['calculus_counter']) {
    res.cookie(
      'calculus_counter',
      parseInt(req.cookies['calculus_counter']) + 1
    )
  } else {
    res.cookie('calculus_counter', 0)
  }
  next()
})

router.post('/', function (req, res, next) {
  calculusService.sum(req.body['First operand'], req.body['Second operand'])
    .then((result) => {
      res.cookie('calculus_result', result)
        .redirect('/calculus/result')
    })
    .catch(next)
})

router.get('/result', function (req, res, next) {
  const result = req.cookies['calculus_result']
  res.render('calculus/result', { result })
})

module.exports = router
