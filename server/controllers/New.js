const models = require('../models');

const { New } = models;

const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.color) {
    return res.status(400).json({ error: 'RAWR! Name, age, and color all required' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    color: req.body.color,
    owner: req.session.account._id,
  };

  const newDomo = new New.DomoModel(domoData);

  const domoPromise = newDomo.save();

  domoPromise.then(() => res.json({ redirect: '/maker' }));

  domoPromise.catch((err) => {
    // console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return domoPromise;
};


const makerPage = (req, res) => {
  New.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      // console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};


const getDomos = (request, response) => {
  const req = request;
  const res = response;

  return New.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      //console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ domos: docs });
  });
};

module.exports.make = makeDomo;
module.exports.getDomos = getDomos;
module.exports.makerPage = makerPage;
