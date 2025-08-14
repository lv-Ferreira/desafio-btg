require('dotenv').config();
const mongoose = require('mongoose');
const createApp = require('./app');
const { startConsumer } = require('./consumer');

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/desafio';

async function start() {
  await mongoose.connect(MONGO_URL);
  const app = createApp();
  app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
  startConsumer().catch(err => console.error('Falha no consumer', err));
}

start().catch(err => { console.error(err); process.exit(1); });
