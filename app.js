// const path = require('path')
const express = require('express');
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')

const  loginRoutes  = require('./routes/loginRoutes')

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

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
app.set('view engine', 'ejs'); // so you can render('index')

// app.set('views', __dirname + '/views');


// Routes
app.use(loginRoutes);

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})