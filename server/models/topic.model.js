const mongoose = require('../common/services/mongoose.service').mongoose;

const Schema = mongoose.Schema;

const topicSchema = Schema({
   name: String,
   description: String,
   imagePath: String,
}, { versionKey: false });

module.exports = mongoose.model('Topic', topicSchema);