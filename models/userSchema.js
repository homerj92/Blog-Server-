const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  Firstname: { type: String, required: true,},
  Lastname: { type: String, required: true,},
  Nickname: { type: String, required: true, unique:true },
  Password: {type: String, required: true},
  Article:[{ type: Schema.Types.ObjectId, ref: 'Article' }]
})

module.exports = mongoose.model('User', UserSchema)
