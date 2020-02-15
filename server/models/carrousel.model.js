const mongoose = require('../common/services/mongoose.service').mongoose;

const Schema = mongoose.Schema;

const carrouselSchema = Schema({
   page: {type : String , unique : true, required : true, dropDups: true},
   imagePath: [String],
   invertColor: Boolean
}, { versionKey: false });

module.exports = mongoose.model('Carrousel', carrouselSchema);