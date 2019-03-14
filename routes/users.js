var express = require('express')
var router = express.Router()

var User = require('../models/userSchema')

var auth = require('../middlewares/currentUser')

// Return current user.
router.get('/me', auth.checkIfUserExists, function (req, res, next) {
  res.json(req.currentUser)
})

// Create user.
router.post('/signIn', function (req, res) {
  var user = new User(req.body)
  user.save((err) => {
    if (err) return res.status(500).json({message: err})
    res.status(201).json({message: 'User created'})
  })
})

// Login user.
router.post('/logIn', function (req, res) {
  if (req.body.Nickname === undefined || req.body.Password === undefined)
  {
    return res.status(400).json({message: 'Nickname and Password are required'})
  }

  User.findOne({ Nickname: req.body.Nickname }, function (err, user) {
    if (err) return res.status(500).json({message: err})
    if (!user) return res.status(404).json({message: `User not found with email: ${req.body.Nickname}`})

    if (req.body.Password === user.Password) {
      return res.status(200).json(user)
    } else {
      return res.status(401).json({message: 'Password incorrect'})
    }
  })
})

// Change user profile.
router.put('/updateUser', auth.checkIfUserExists, function (req, res, next) {
  var user = req.currentUser
  if (req.body.Nickname === undefined) res.status(400).json({ message: 'Please insert Nickname' })
  user.Nickname = req.body.Nickname

  user.save(function (err) {
    if (err) return res.status(500).json({error: err})
    res.status(200).json({ message: 'User successfully modified' })
  })
})

// Delete user.
router.delete('/deleteUser', auth.checkIfUserExists, function (req, res, next) {
  var user = req.currentUser

  user.remove(function (err) {
      if (err) return res.status(500).json({error: err})
      res.json({message: 'User deleted'})
  })
})

module.exports = router
