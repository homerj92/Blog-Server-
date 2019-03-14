var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/BlogDB', { useNewUrlParser: true })
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
var users = require('./routes/users')
var articles = require ('./routes/articles')
var categories = require('./routes/categories')
app.use('/users', users)
app.use('/articles',articles)
app.use('/categories', categories)


var port = 3001
app.listen(port, () => {
  console.log(`start port at ${port}`)
})

module.exports = app
