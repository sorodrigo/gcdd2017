require('dotenv').config();
const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();
const port = process.env.PORT || 5000;
const indexPath = path.join(process.cwd(), 'dist/index.html');

app.use(serveStatic(path.join(__dirname, '/dist')));
app.use('/api', jsonServer.router('db.json'));

app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

app.listen(port, () => console.info(`Server started at ${port}`));
