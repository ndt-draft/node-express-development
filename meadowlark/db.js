var MongoClient = require('mongodb').MongoClient

var state = {
  db: null
}

exports.connect = function(url, options, done) {
  if (state.db) {
    done()
  }

  MongoClient.connect(url, options, function (err, client) {
    if (err) return done(err)

    state.db = client.db('node-express-dev')

    done()
  })
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}
