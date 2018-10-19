const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('muscufacileapi:server');
const http = require('http');
const bodyParser = require('body-parser');
const google = require('./app/api/auth/google/initSession');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//google auth
const passport = google.generatePassport();

app.use(passport.initialize());

// app.get('/', (req, res) => {
//   res.json({
//     status: 'session cookie not set'
//   });
// });

app.get('/', function(req, res, next) {
  res.send({ "title": 'yop' });
});


//fin google auth

//ROUTES
app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => { }
);

require('./app/api/user')(app);


app.get('*', (req, res) => {
  res.status(400).send({reason: 'Route not Found'});
});


// Create HTTP server.
 
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8080';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = app;
