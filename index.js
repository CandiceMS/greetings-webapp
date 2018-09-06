const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

let greetings = require('./greetings');

const postgres = require('pg');
const Pool = postgres.Pool;

let useSSL = false;
if(process.env.DATABASE_URL){
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/greet_users'

const pool = new Pool({
  connectionString,
  ssl:useSSL
})

const greet = greetings(pool);


let PORT = process.env.PORT || 3500;

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('home');
});

// app.get('/greetings', function (req, res) {
//     req.flash('info', 'Flash Message Added');
//     res.redirect('/');
// });

app.post('/greetings', async function(req, res) {
   let language = req.body.language;
   let name = req.body.inputName;
  res.render('home', {
    alert: greet.alert(name, language),
    greetPerson: await greet.greetPerson(language, name),
    count: await greet.counter()
  });
});

app.get('/greeted', async function(req, res) {
  res.render('greeted', {
    userCount: await greet.returnUsers()
  });
});

app.get('/greeted/:user', async function(req, res) {
  res.render('greetedUser', {
     userGreeted: req.params.user,
     greetNumber: await greet.returnUserGreet(req.params.user)
  });
});

app.post('/clear', async function(req, res) {
   await greet.resetCount();
  res.redirect('/');
});

