const router = require('express').Router();
const middleware = require('../middleware')

router.get('/signup',  (req, res, next) => {
  res.render('accounts/signup')

});

module.exports = router