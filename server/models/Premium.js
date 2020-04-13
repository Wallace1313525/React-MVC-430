const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let PremiumModel = {};

const PremiumSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
  },
    
  Premium: {
    type: Boolean,
    required: true,
  },
    

});

PremiumSchema.statics.toAPI = (doc) => ({
  // _id is built into your mongo document and is guaranteed to be unique
  username: doc.username,
  _id: doc._id,
});


PremiumSchema.statics.findByUsername = (name, callback) => {
  const search = {
    username: name,
  };

  return PremiumModel.findOne(search, callback);
};




NewModel = mongoose.model('Premium', PremiumSchema);

module.exports.PremiumModel = PremiumModel;
module.exports.PremiumSchema = PremiumSchema;
