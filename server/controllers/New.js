//renders new password page
const models = require('../models');

const { Account } = models;

const passPage = (req, res) => {
  res.render('change');
};

// Update the user password
const newPass = (request, response) => {
  const req = request;
  const res = response;

  // Get a new hash and salt for the new password
  Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    // Update the password
    return Account.AccountModel.updatePassword(accountData, (err, docs) => {
      if (err) {
        // console.log(err);
        return res.status(400).json({ error: 'An error occurred' });
      }

      req.session.account = Account.AccountModel.toAPI(accountData);


      return res.json({ account: docs });
    });
  });
};


module.exports.newPass = newPass;
module.exports.passPage = passPage;
