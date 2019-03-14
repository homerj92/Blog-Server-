const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  Author: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  Date: {type: Date, default: Date.now()},
  Title: { type: String, required: true },
  Description: { type:String, required: true},
  Category: { type: String, required:true },
  Like: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  Comment:[{ type: Schema.Types.ObjectId, ref: 'Comment'}]

})

module.exports = mongoose.model('Article', ArticleSchema)
