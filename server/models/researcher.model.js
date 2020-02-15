const mongoose = require('../common/services/mongoose.service').mongoose;

const Schema = mongoose.Schema;

const researcherSchema = Schema({
   name: String,
   abbreviation: String,
   headline: String,
   about: String,
   socialNetworks: [String],
   email: String,
   phoneNumber: String,
   lattesUrl: String,
   imagePath: String
}, { versionKey: false });

module.exports = mongoose.model('Researcher', researcherSchema);