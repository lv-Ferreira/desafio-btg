const express = require('express');
const bodyParser = require('body-parser');
const pedidoRoutes = require('./routes/pedidos');

function createApp() {
  const app = express();
  app.use(bodyParser.json());
  app.use('/api', pedidoRoutes);
  app.get('/', (_, res) => res.send('Desafio BTG - API rodando.'));
  return app;
}

module.exports = createApp;
