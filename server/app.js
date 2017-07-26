const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const db = require('./db');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({ db });
const PORT = process.env.PORT || 2407;
const app = express();

const server = {};
server.app = app;
server.store = store;
module.exports = server;

if (process.env.NODE_ENV === 'development') require('../secrets');

passport.serializeUser((user, done) =>
  done(null, user.id));

passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
    .then(user => done(null, user))
    .catch(done));

server.createApp = () => app
  .use(morgan('dev'))
  .use(express.static(path.join(__dirname, '..', 'public')))
  .use('/bootstrap', express.static(path.join(__dirname, '..', 'node_modules/bootstrap/dist')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(session({
    secret: process.env.SESSION_SECRET || 'Skynet sent two Terminators back through time',
    store,
    resave: false,
    saveUninitialized: false
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use('/auth', require('./auth'))
  .use('/api', require('./api'))
  .use((req, res, next) =>
    path.extname(req.path).length > 0 ? res.status(404).send('Not found') : next())
  .use('*', (req, res) =>
    res.sendFile(path.join(__dirname, '..', 'public/index.html')))
  .use((err, req, res, next) =>
    res.status(err.status || 500).send(err.message || 'Internal server error.'));

server.syncDb = () =>
  db.sync();
server.listenUp = () => {
  const appServer = app.listen(PORT, () =>
    console.log(`Check it out on port ${PORT}`));
};
server.session = session;
