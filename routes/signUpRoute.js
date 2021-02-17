const router = require('express').Router();
const middleware = require('../middleware')

router.get('/signup',  (req, res, next) => {
  res.status(200).render('accounts/signup')
  
});

router.post("/signup", (req, res, next)=>{
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  
  if (firstName && lastName && username && email && password) {
    
  } else {
    
    res.status(200).render('accounts/signup')
  }

})

module.exports = router