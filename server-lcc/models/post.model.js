const mongoose = require('../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const fileUploadModel = require('./files-upload.model');


const postSchema = Schema({
   author: String,
   title: String,
   date: Date,
   imagePath: String,
   content: String
}, { versionKey: false });

postSchema.pre('findOneAndDelete', async function () {
  const docToUpdate = await this.model.findOne(this.getQuery());
  console.log(docToUpdate); // The document that `findOneAndDelete()` will modify
  fileUploadModel.gfs.remove({ filename: docToUpdate.imagePath, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      console.log(err);
    }
  })
});

module.exports = mongoose.model('Post', postSchema);
