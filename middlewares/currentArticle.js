var Article = require('../models/articleSchema')

// Ceck if article exist.
var checkIfArticleExists = function (req, res, next) {
  var id = req.query.idArticle

  Article.findById(id).exec(function (err, currentArticle) {
    if (err) return res.status(500).json({message: err})
    if (!currentArticle) return res.status(404).json({message: 'Article not found'})
    req.currentArticle = currentArticle
    next()
  })
}

module.exports.checkIfArticleExists = checkIfArticleExists
