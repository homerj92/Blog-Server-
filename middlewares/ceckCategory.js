var Category = require('../models/categorySchema')

// Ceck if Category exist.
var checkIfCategoryExist = function (article) {
  Category.findOne({ Name: article.Category }, function(err, currentCategory) {
    if (err) return false

    // if category does not exist, a new category is created.
    if (!currentCategory) {
      var category = new Category
      category.Name = article.Category
      category.Articles.push(article._id)

      category.save((err) => {
        if (err) return false
      })
      // if category exists, insert the article in its array.
    } else {
      currentCategory.Articles.push(article._id)
      currentCategory.save((err) => {
        if (err) return false
      })
    }
 })
}

module.exports.checkIfCategoryExist = checkIfCategoryExist
