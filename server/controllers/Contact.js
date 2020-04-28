//renders contact page.  Sets up savving a new contact
const models = require('../models');

const { Contact } = models;

//add contact to node list
const makeContact = (req, res) => {
  if (!req.body.name || !req.body.num || !req.body.rel) {
    return res.status(400).json({ error: 'RAWR! Name, num, and relationship all required' });
  }

  const contactData = {
    name: req.body.name,
    num: req.body.num,
    rel: req.body.rel,
    owner: req.session.account._id,
  };

  const newContact = new Contact.ContactModel(contactData);

  const contactPromise = newContact.save();

  contactPromise.then(() => res.json({ redirect: '/maker' }));

  contactPromise.catch((err) => {
    // console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Contact already exists' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return contactPromise;
};

//gets all contacts that are already assigned to a user
const makerPage = (req, res) => {
  Contact.ContactModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      // console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), contacts: docs });
  });
};

//gets all conacts and updates new contacts when make button is hit
const getContacts = (request, response) => {
  const req = request;
  const res = response;

  return Contact.ContactModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      // console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ contacts: docs });
  });
};

module.exports.make = makeContact;
module.exports.getContacts = getContacts;
module.exports.makerPage = makerPage;
