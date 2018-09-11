var express = require('express')

var db = require('./db')
var aboutRouter = require('./routes/about')

var app = express()

app.set('port', process.env.PORT || 3000)

var handlebars = require('express3-handlebars')
  .create({defaultLayout: 'main'})
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
  res.render('home')
})

app.use('/about', aboutRouter)

app.use(express.static('public'))

app.use(function (req, res) {
  res.status(404)
  res.render('404')
})

app.use(function (err, req, res, next) {
  console.log(err.stack)
  res.status(500)
  res.render('500')
})

db.connect('mongodb://localhost:27017/node-express-dev', {
  useNewUrlParser: true
}, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
  } else {
    app.listen(app.get('port'), function () {
      console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.')
    })
  }
})
