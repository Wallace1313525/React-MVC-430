const models = require('../models');

const { New } = models;


const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};


const passPage = (req, res) => {
  res.render('change');
};

const newPass = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'RAWR! All fields are required!' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(400).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/changePass' });
  });
};


module.exports.logout = logout;
module.exports.newPass = newPass;
module.exports.passPage = passPage;
