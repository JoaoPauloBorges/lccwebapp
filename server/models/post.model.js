const mongoose = require('../common/services/mongoose.service').mongoose;

const Schema = mongoose.Schema;

const postSchema = Schema({
   author: String,
   title: String,
   date: Date,
   imagePath: String,
   content: String
}, { versionKey: false });

module.exports = mongoose.model('Post', postSchema);