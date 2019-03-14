var express = require('express')
var router = express.Router()

var Category = require('../models/categorySchema')

var auth = require('../middlewares/currentUser')

// Return category.
router.get('/archive', auth.checkIfUserExists, function (req, res, next) {
  Category.find().exec(function (err, currentCategory) {
      if (err) return res.status(500).json({message: err})
      res.status(200).json(currentCategory)
    })
})

module.exports = router
