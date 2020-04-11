const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let NewModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();
const setColor = (color) => _.escape(color).trim().toLowerCase();

const NewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  age: {
    type: Number,
    min: 0,
    required: true,
  },
    
  color: {
    type: String,
    required: true,
    trim: true,
    set: setColor,
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

NewSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
});

NewSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return NewModel.find(search).select('name age color').lean().exec(callback);
};

NewModel = mongoose.model('New', NewSchema);

module.exports.NewModel = NewModel;
module.exports.NewSchema = NewSchema;
