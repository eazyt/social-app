const router = require('express').Router();
const middleware = require('../middleware');
const User = require('../models/UserSchema');

router.get('/signup',  (req, res, next) => {
  console.log('THIS RUN')
  res.status(200).render('accounts/signup')
  
});

router.post("/signup", async (req, res, next)=>{
  // let firstName = req.body.firstName;
  // let lastName = req.body.lastName;
  // let username = req.body.username;
  // let email = req.body.email;
  // let password = req.body.password;

  const data = req.body
  console.log(data)

  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  user.save((err)=>{
    if (err) {
      console.log(err)
      return;
    } else {
      res.redirect('/login')
      
    }
  })

})

module.exports = router