const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let ContactModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();
const setRel = (rel) => _.escape(rel).trim().toLowerCase();

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  num: {
    type: Number,
    min: 0,
    required: true,
  },
    
  rel: {
    type: String,
    required: true,
    trim: true,
    set: setRel,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

ContactSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  num: doc.num,
  rel: doc.rel,
});

ContactSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return ContactModel.find(search).select('name num rel').lean().exec(callback);
};

ContactModel = mongoose.model('Contact', ContactSchema);

module.exports.ContactModel = ContactModel;
module.exports.ContactSchema = ContactSchema;
