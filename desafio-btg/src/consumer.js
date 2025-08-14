const { connectRabbit } = require('./utils/rabbitmq');
const Pedido = require('./models/pedido.model');
const { calcValorTotal } = require('./utils/calc');

const QUEUE = process.env.RABBITMQ_QUEUE || 'pedidos';

async function startConsumer() {
  const { conn, channel } = await connectRabbit(process.env.RABBITMQ_URL);
  await channel.assertQueue(QUEUE, { durable: true });
  console.log(' [*] Aguardando mensagens na fila', QUEUE);

  channel.consume(QUEUE, async (msg) => {
    if (!msg) return;
    try {
      const content = JSON.parse(msg.content.toString());
      if (!content || !content.itens || !Array.isArray(content.itens)) {
        throw new Error('Mensagem inválida: itens ausentes');
      }
      const valorTotal = calcValorTotal(content.itens);
      const pedido = new Pedido({
        codigoPedido: content.codigoPedido,
        codigoCliente: content.codigoCliente,
        itens: content.itens,
        valorTotal
      });
      await pedido.save();
      channel.ack(msg);
      console.log(' [x] Pedido salvo', content.codigoPedido);
    } catch (err) {
      console.error('Erro ao processar mensagem', err?.message || err);
      channel.nack(msg, false, false); // descarta (DLQ pode ser configurada no compose)
    }
  }, { noAck: false });
}

module.exports = { startConsumer };
