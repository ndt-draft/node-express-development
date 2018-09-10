var express = require('express')
var MongoClient = require('mongodb').MongoClient

function mongoConnect(callback) {
  MongoClient.connect('mongodb://localhost:27017/node-express-dev', function (err, client) {
    if (err) throw err

    var db = client.db('node-express-dev')

    callback(db)

    client.close()
  })
}

var app = express()

app.set('port', process.env.PORT || 3000)

var handlebars = require('express3-handlebars')
  .create({defaultLayout: 'main'})
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
  res.render('home')
})

app.get('/about', function (req, res) {
  mongoConnect(function (db) {
    db.collection('fortune').find().toArray(function (err, result) {
      if (err) throw err

      var fortunes = result.map(function (fortune) {
        return fortune.content
      })

      var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      res.render('about', { fortune: randomFortune });
    })
  })
})

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

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.')
})
