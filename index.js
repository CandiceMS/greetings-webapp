const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

let greetings = require('./greetings');
let greet = greetings();

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

app.post('/greetings', function(req, res) {
  let language = req.body.language;
  let name = req.body.inputName;
    greet.assignName(language, name);
  res.render('home', {
    alert: greet.alert(name, language),
    greetPerson: greet.greetPerson(language, name),
    count: greet.counter()
  });
});

app.get('/greeted', function(req, res) {
  res.render('greeted', {
    userCount: greet.returnMap()
  });
});

app.get('/greeted/:user', function(req, res) {
  res.render('greetedUser', {
     userGreeted: req.params.user,
     greetNumber: greet.returnUser(req.params.user)
  });
});

app.post('/clear', function(req, res) {
   greet.resetCount();
  res.redirect('/');
});

// app.get('/actions/:type', function(req, res) {
//   res.render('filter', {
//     actionFilter: setBill.filterActions(req.params.type),
//     totalForAction: setBill.actionTotal(req.params.type)
//   });
// });
