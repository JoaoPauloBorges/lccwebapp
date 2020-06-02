const mongoose = require('../common/services/mongoose.service').mongoose;
const fileUploadModel = require('./files-upload.model');

const Schema = mongoose.Schema;

const topicSchema = Schema({
  name: String,
  date: Date,
  imagePath: String,
}, { versionKey: false });

topicSchema.pre('findOneAndDelete', async function () {
  const docToUpdate = await this.model.findOne(this.getQuery());
  console.log(docToUpdate); // The document that `findOneAndDelete()` will modify
  fileUploadModel.gfs.remove({ filename: docToUpdate.imagePath, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      console.log(err);
    }
  })
});

module.exports = mongoose.model('Topic', topicSchema);
