var User = require('../models/userSchema')

// Ceck if user exist.
var checkIfUserExists = function (req, res, next) {
  var id = req.query.id

  User.findById(id).exec(function (err, currentUser) {
    if (err) return res.status(500).json({message: err})
    if (!currentUser) return res.status(404).json({message: 'User not found'})
    req.currentUser = currentUser
    next()
  })
}

module.exports.checkIfUserExists = checkIfUserExists
