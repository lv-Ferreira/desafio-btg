const amqplib = require('amqplib');

async function connectRabbit(rabbitUrl) {
  if (!rabbitUrl) throw new Error('RABBITMQ_URL não configurada');
  const conn = await amqplib.connect(rabbitUrl);
  const channel = await conn.createChannel();
  return { conn, channel };
}

module.exports = { connectRabbit };
