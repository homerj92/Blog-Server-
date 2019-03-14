const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  Name: { type: String, required: true, unique: true },
  Articles:[{ type: Schema.Types.ObjectId, ref: 'Article'}]

})

module.exports = mongoose.model('Category', CategorySchema)
