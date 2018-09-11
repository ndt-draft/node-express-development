var express = require('express');
var router = express.Router();

var authorController = require('../controllers/aboutController')

router.get('/', authorController.index)

module.exports = router
