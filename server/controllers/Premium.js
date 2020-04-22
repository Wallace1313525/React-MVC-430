const models = require('../models');

const { New } = models;


const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};


const premPage = (req, res) => {
  res.render('premium');
};

const newPrem = (request, response) => {
  const req = request;
  const res = response;
    
    return res.json({ redirect: '/premium' });
};


module.exports.logout = logout;
module.exports.premiumPage = premPage;
