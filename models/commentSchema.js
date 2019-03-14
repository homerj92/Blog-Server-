const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  Owner: [{type: Schema.Types.ObjectId, ref: 'User'}],
  Text: { type: String, required: true},
})

module.exports = mongoose.model('Comment', CommentSchema)
