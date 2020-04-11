const models = require('../models');

const { New } = models;


const makerPage = (req, res) => {
    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
};


module.exports.makerPage = makerPage;
