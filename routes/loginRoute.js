const router = require('express').Router();
const middleware = require('../middleware')

router.get('/login',  (req, res, next) => {
  res.render('accounts/login')

});

module.exports = router