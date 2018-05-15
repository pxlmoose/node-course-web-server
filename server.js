const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append server log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'maintenance page',
//     welcomeMessage: 'page under maintenance'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!<h1>');
  res.render('home.hbs', {
    pageTitle: 'home page',
    welcomeMessage: 'Welcome home'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'about page',
    });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'page does not exist',
    solution: 'get out'
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
