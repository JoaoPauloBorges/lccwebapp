const mongoose = require('../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const paperSchema = Schema({
   researchers: [{ type: Schema.Types.ObjectId, ref: 'Researcher' }],
   title: String,
   paperDate: Date,
   topicId: { type: Schema.Types.ObjectId, ref: 'Topic' },
   abstract: String,
   references: String,
   imagePath: String,
},
   { versionKey: false });

const Paper = mongoose.model('Paper', paperSchema);

exports.createPaper = (paperData) => {
   const paper = new Paper(paperData);
   return paper.save();
};

exports.update = (paperId , paperData) => {
  return Paper.findByIdAndUpdate(paperId, paperData, {omitUndefined: true, new: true , useFindAndModify: false});
};

exports.findByTitle = (title) => {
   return Paper
      .find({ title })
      .populate('researchers')
      .exec();
};

exports.findById = async (id) => {
   let result = await Paper.findById(id)
      .populate('researchers')
      .exec();
   return result;
};

exports.findByTopicId = (topicId) => {
   return Paper
      .find({ topicId })
      .populate('researchers')
      .exec();
};

exports.findByResearcherId = (researcherId) => {
   return Paper
      .find({ researchers: { $in: [researcherId] } })
      .populate('researchers')
      .exec();
};

exports.list = (perPage, page) => {
   return new Promise((resolve, reject) => {
      Paper.find()
         .limit(perPage)
         .skip(perPage * page)
         .exec(function (err, Papers) {
            if (err) {
               reject(err);
            } else {
               resolve(Papers);
            }
         })
   });
};

exports.removeById = (paperId) => {
   return new Promise((resolve, reject) => {
      Paper.deleteOne({ _id: paperId }, (err) => {
         if (err)
            reject(err);
         else
            resolve(err);
      });
   });
};