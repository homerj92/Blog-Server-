var express = require('express')
var router = express.Router()

var Article = require('../models/articleSchema')
var Comment = require('../models/CommentSchema')

var auth = require('../middlewares/currentUser')
var category = require('../middlewares/ceckCategory')
var article = require('../middlewares/currentArticle')

// Return all article.
router.get('/allArticle', auth.checkIfUserExists, function (req, res, next) {
  Article.find()
  .populate('Author Like Comment',  'Nickname  Text Owner -_id')
  .sort({ Date:-1 })
  .exec(function (err, article) {
      if (err) return res.status(500).json({message: err})
      res.status(200).json(article)
    })
})

// Create article.
router.post('/create', auth.checkIfUserExists, function (req, res, next) {
  var user = req.currentUser
  var article = new Article(req.body)
  article.Author = user._id

  article.save((err) => {
    if (err) return res.status(500).json({message: err})

    // Call method that checks if category exists.
    category.checkIfCategoryExist(article)

    user.Article.push(article._id);

    user.save((err) => {
      if (err) return res.status(500).json({message: err})
      res.status(201).json({message: 'Article created'})
    })

  })
})

// Add a like to an article.
router.put('/like', auth.checkIfUserExists, article.checkIfArticleExists, function (req, res, next) {
  var article = req.currentArticle
  var user = req.currentUser
  article.Like.push(user._id)

  article.save((err) => {
    if (err) return res.status(500).json({message: err})
    res.status(201).json({message: 'like Added'})
  })
})

// Add a comment to an article.
router.post('/comment', auth.checkIfUserExists, article.checkIfArticleExists, function (req, res, next) {
  var user = req.currentUser
  var article = req.currentArticle
  var comment = new Comment (req.body)
  comment.Owner = req.currentUser._id

  comment.save((err) => {
    if (err) return res.status(500).json({message: err})
    article.Comment.push(comment._id)

    article.save((err) => {
      if (err) return res.status(500).json({message: err})
      res.status(201).json({message: 'Comment Added'})
    })
  })
})

module.exports = router
