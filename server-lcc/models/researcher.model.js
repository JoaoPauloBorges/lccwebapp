const mongoose = require('../common/services/mongoose.service').mongoose;
const fileUploadModel = require('./files-upload.model');

const Schema = mongoose.Schema;

const researcherSchema = Schema({
  type: {
    type: String,
    enum: ['Researcher', 'Coordinator', 'Partner'],
    default: 'Researcher'
  },
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

researcherSchema.pre('findOneAndDelete', async function () {
  const docToUpdate = await this.model.findOne(this.getQuery());
  console.log(docToUpdate); // The document that `findOneAndDelete()` will modify
  fileUploadModel.gfs.remove({ filename: docToUpdate.imagePath, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      console.log(err);
    }
  })
});

module.exports = mongoose.model('Researcher', researcherSchema);
