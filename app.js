// const path = require('path')
const express = require('express');
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const flash = require('req-flash')
const session = require('express-session')


const  loginRoute  = require('./routes/loginRoute')
const  signUpRoute  = require('./routes/signUpRoute')

const app = express();

const config = require('./config/database');
const PORT = config.port || 3021;

mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})
.then(() => {
  console.log(`succefully connected to the Database`)
})
.catch((e) => {
  console.log(`something went wrong, could not connect to database,`, e)
})

app.use(express.static(__dirname + '/public'));
// app.use(express.static(path.join(__dirname , 'public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: config.secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true}
}))
app.use(flash())

app.locals.errors = 0;

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
app.set('view engine', 'ejs'); // so you can render('index')

// app.set('views', __dirname + '/views');


// Routes
app.use(loginRoute);
app.use(signUpRoute);

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})