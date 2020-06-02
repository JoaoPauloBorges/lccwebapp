const mongoose = require('../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const fileUploadModel = require('./files-upload.model');


const carrouselSchema = Schema({
  page: { type: String, unique: true, required: true, dropDups: true },
  imagePath: [String],
  invertColor: Boolean
}, { versionKey: false });


carrouselSchema.pre('findOneAndDelete', async function () {
  const docToUpdate = await this.model.findOne(this.getQuery());
  console.log(docToUpdate); // The document that `findOneAndDelete()` will modify

  docToUpdate.imagePath.map((imagePath) => {
    fileUploadModel.gfs.remove({ filename: imagePath, root: 'uploads' }, (err, gridStore) => {
      if (err) {
        console.log(err);
      }
    });
  });
});

module.exports = mongoose.model('Carrousel', carrouselSchema);
