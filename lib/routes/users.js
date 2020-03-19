var express = require('express')
var router = express.Router()

/* GET users listing. */

router.use(function (req, res, next) {
  const queryLogString = Object.entries(req.query)
    .reduce(
      (queryLogString, [key, value]) => queryLogString + ` ${key}=${value}`
      , '')
  console.log('> query params:', queryLogString)
  next()
})

router.get('/', function (req, res, next) {
  const numberOfUser = Math.min(req.query.nb || 2, 10000)

  const users = Array.from({ length: numberOfUser },
    (v, i) => {
      return { name: `User ${i}` }
    })

  res.render('users/index', {
    showTitle: true,
    users
  })
})

module.exports = router
