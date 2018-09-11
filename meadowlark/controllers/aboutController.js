var db = require('../db')

exports.index = function(req, res) {
  var collection = db.get().collection('fortune')

  collection.find().toArray(function (err, result) {
    if (err) throw err

    var fortunes = result.map(function (fortune) {
      return fortune.content
    })

    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
  })
}
