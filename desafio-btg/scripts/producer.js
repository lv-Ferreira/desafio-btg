require('dotenv').config();
const amqplib = require('amqplib');

(async () => {
  const url = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
  const fila = process.env.RABBITMQ_QUEUE || 'pedidos';
  const conn = await amqplib.connect(url);
  const ch = await conn.createChannel();
  await ch.assertQueue(fila, { durable: true });
  const pedido = {
    codigoPedido: Math.floor(Math.random()*100000),
    codigoCliente: 1,
    itens: [
      { produto: 'lápis', quantidade: 100, preco: 1.10 },
      { produto: 'caderno', quantidade: 10, preco: 1.00 }
    ]
  };
  ch.sendToQueue(fila, Buffer.from(JSON.stringify(pedido)), { persistent: true });
  console.log('Mensagem enviada para', fila, pedido);
  setTimeout(() => conn.close(), 500);
})().catch(e => { console.error(e); process.exit(1); });
