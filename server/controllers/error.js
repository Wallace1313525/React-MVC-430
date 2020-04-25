const models = require('../models');

const { New } = models;



const errorPage = (req, res) => {
  res.render('error');
};


module.exports.errorPage = errorPage;
