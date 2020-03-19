var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes')
var usersRouter = require('./routes/users')
var calculusRouter = require('./routes/calculus')
var dogsRouter = require('./routes/dogs')

const { NotEvenResultError, RessourceNotFoundError } = require('./errors')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

if (app.get('env') == 'development') {
  app.use(logger('dev'))
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/calculus', calculusRouter)
app.use('/dogs', dogsRouter)

app.get('/404', function (req, res, next) {
  res.status(404)
    .render('errors/404')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  if (err.status != 404) { return next(err) }

  res.redirect('/404')
})
app.use(function (err, req, res, next) {
  if (err instanceof NotEvenResultError) {
    return res.render('errors/not-even-result', { message: err.message })
  }
  if (err instanceof RessourceNotFoundError) {
    return res.status(404).render('errors/resource-not-found')
  }
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app