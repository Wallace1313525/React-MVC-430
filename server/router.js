const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getContacts', mid.requiresLogin, controllers.Contact.getContacts);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.Contact.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Contact.make);
    
  app.get('/changePass', mid.requiresLogin, controllers.New.passPage);
  app.post('/changePass', mid.requiresLogin, controllers.New.newPass);
    
  app.get('/premium', mid.requiresLogin, controllers.Premium.premiumPage);
  app.post('/premium', mid.requiresLogin, controllers.Premium.premiumPage);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
