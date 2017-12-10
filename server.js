require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const jsonServer = require('json-server');
const path = require('path');
const serveStatic = require('serve-static');
const db = require('./db.json');

const app = express();
const port = process.env.PORT || 5000;
const indexPath = path.join(process.cwd(), 'dist/index.html');

app.use(bodyParser.json({ type: 'application/json' }));
app.use(serveStatic(path.join(__dirname, '/dist')));
app.use('/api', jsonServer.router('db.json'));

app.post('/auth', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => (u.email === email && u.password === password));

  if (user) {
    res.json({ data: user });
  } else {
    res.status(404).json({ error: 'user not found', user: email, password: password });
  }
});

app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

app.listen(port, () => console.info(`Server started at ${port}`));
