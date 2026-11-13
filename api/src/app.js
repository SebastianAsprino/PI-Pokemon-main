const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const BODY_LIMIT = '100kb';

// CORS_ORIGIN admite una lista separada por comas; si no se define se permite cualquier origen.
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const server = express();

server.name = 'API';
server.disable('x-powered-by');
server.use(express.static(path.join(__dirname, '..', 'public')));
server.use(express.urlencoded({ extended: true, limit: BODY_LIMIT }));
server.use(express.json({ limit: BODY_LIMIT }));
server.use(morgan('dev'));
server.use(cors({
  origin: allowedOrigins.length > 0 ? allowedOrigins : '*',
  methods: ['GET', 'POST', 'OPTIONS'],
}));

server.use('/', routes);

// Error catching endware: registra el detalle y responde sin filtrar información interna.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(409).json({ error: 'Ya existe un pokemon con ese ID' });
    return;
  }

  const status = err.status || err.statusCode || 500;
  console.error(err); // eslint-disable-line no-console
  res.status(status).json({
    error: status < 500 ? err.message : 'Error interno del servidor',
  });
});

module.exports = server;
