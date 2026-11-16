require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const apiRoutes = require('./routes/apiRoutes');
const { attachCurrentUser } = require('./middleware/authMiddleware');

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET is required. Copy .env.example to .env and configure a long random secret.');
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use((req, res, next) => {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});
app.use(attachCurrentUser);
app.locals.formatDate = (date) => new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(date));

app.get('/', (req, res) => {
  res.render('index', { title: 'Find your next build partner' });
});

app.use(authRoutes);
app.use(projectRoutes);
app.use(applicationRoutes);
app.use('/api', apiRoutes);

app.use((req, res) => {
  if (req.originalUrl.startsWith('/api/')) return res.status(404).json({ error: 'Endpoint not found.' });
  return res.status(404).render('404', { title: 'Page not found' });
});

app.use((error, req, res, next) => {
  console.error(error);
  if (req.originalUrl.startsWith('/api/')) return res.status(500).json({ error: 'Something went wrong on our side.' });
  return res.status(500).render('error', { title: 'Something went wrong' });
});

module.exports = app;
