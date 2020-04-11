const models = require('../models');

const { New } = models;

const makerPage = (req, res) => {
  New.NewModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      // console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};

module.exports.makerPage = makerPage;
