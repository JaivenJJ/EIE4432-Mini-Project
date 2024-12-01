import express from 'express';
import session from 'express-session';
import path from 'path';
import login from './login.js';
import mongostore from 'connect-mongo';
import client from './dbclient.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: '22076742d_eie4432_lab5',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
    store: mongostore.create({
      client,
      dbName: 'lab5db',
      collectionName: 'session',
    }),
  })
);

app.use('/auth', login);

app.get('/', (req, res) => {
  if (req.session.logged) {
    return res.redirect('/index.html');
  }
  res.redirect('/login.html');
});

app.use('/', express.static(path.join('static')));

const PORT = 8080;
app.listen(PORT, () => {
  const currentDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
  console.log(`${currentDate}`);
  console.log(`Server started at http://127.0.0.1:${PORT}`);
});