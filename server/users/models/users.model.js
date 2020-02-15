const mongoose = require('../../common/services/mongoose.service').mongoose;

const Schema = mongoose.Schema;

const userSchema = new Schema({
   firstName: String,
   lastName: String,
   email: String,
   password: String,
});
const User = mongoose.model('Users', userSchema);

userSchema.virtual('id').get(function () {
   return this._id.toHexString();
});
userSchema.set('toJSON', { // Ensure virtual fields are serialised.
   virtuals: true
});

exports.findByEmail = (email) => {
   return User.find({ email: email });
};

exports.findById = async (id) => {
   let result = await User.findById(id);
   result = result.toJSON();
   delete result.__v;
   delete result._id;
   return result;
};

exports.createUser = (userData) => {
   const user = new User(userData);
   return user.save();
};

exports.list = (perPage, page) => {
   return new Promise((resolve, reject) => {
      User.find()
         .limit(perPage)
         .skip(perPage * page)
         .exec(function (err, users) {
            if (err) {
               reject(err);
            } else {
               resolve(users);
            }
         })
   });
};

exports.removeById = (userId) => {
   return new Promise((resolve, reject) => {
      User.deleteOne({ _id: userId }, (err) => {
         if (err)
            reject(err);
         else
            resolve(err);
      });
   });
};