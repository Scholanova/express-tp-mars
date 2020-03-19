const calculusService = require('../services/calculusService')
const dogsRepository = require('../repositories/dogRepository')
const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  dogsRepository.listAll()
    .then((dogs) => {
    	console.log("dogsssss" + dogs);
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
    	const dogs = Array.from({ length: 1 },
    (v, i) => {
      return { name: result.name, age: result.age }
    })

           res.render('dogs/list', { dogs })
    })
    .catch(next)
})


router.get('/:id', function (req, res) {
	console.log("test/ete" + req.params.id);

	 dogsRepository.get(req.params.id)
	 .then((result) => {
    	const dogs = Array.from({ length: 1 },
    (v, i) => {
      return { name: result.name, age: result.age }
    })

  res.render('dogs/list', {
    dogs
  })
    })

	 
    
})


module.exports = router
