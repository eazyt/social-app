const router = require('express').Router();
const User = require('../models/UserSchema');

router.get('/',  (req, res, next) => {
  res.status(200).render('accounts/signup',{
    title: 'Register'
  })
  
});

router.get('/signup',  (req, res, next) => {
  res.status(200).render('accounts/signup',{
    title: 'Register'
  })
  
});

router.post("/signup", async (req, res, next)=>{
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  
  if (firstName && lastName && username && email && password) {
    console.log('POST THIS RUNS1')
    let user = await User.findOne({
      $or: [
        {username: username}, 
        {email: email} 
      ]
    })
    .catch((error)=>{
      console.log('THIS IS CATCH')
      console.log(error)
      req.flash('errorMessage', 'Something went wrong - user exist')
      res.status(200).render('accounts/signup', {
        title: 'Register',
        errors: req.flash('errorMessage')
      })
    });
    if (user == null) {
      console.log('POST THIS RUNS2')
      // No user found
      let data = req.body
      User.create(data)
      .then((user) => {
        res.redirect('/login')
        // console.log(user)
      })
    } else {
      console.log('POST THIS RUNS3')
      // User found
      if (email == user.email) {
        req.flash('errorMessage', 'We already have a user with that email')
        console.log("email already in use")
      } else {
        console.log('POST THIS RUNS4')
        req.flash('errorMessage', 'We already have a user with that username')
        console.log("username already in use")
      }
      res.status(200).render('accounts/signup' ,{
        title: 'Register',
        errors: req.flash('errorMessage')
      })
    }
    
  } else {
    console.log('POST THIS RUNS5')
    // res.status(200).render('accounts/login',{
      //   title: 'Login'
      // })
      // console.log(req.body)
      res.redirect('/login')
    }
    
  })
  
module.exports = router