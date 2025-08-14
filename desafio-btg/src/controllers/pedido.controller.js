const Pedido = require('../models/pedido.model');

async function getValorTotal(req, res) {
  try {
    const { codigoPedido } = req.params;
    const pedido = await Pedido.findOne({ codigoPedido: Number(codigoPedido) });
    if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });
    return res.json({ codigoPedido: pedido.codigoPedido, valorTotal: pedido.valorTotal });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno' });
  }
}

async function getQuantidadePorCliente(req, res) {
  try {
    const { codigoCliente } = req.params;
    const count = await Pedido.countDocuments({ codigoCliente: Number(codigoCliente) });
    return res.json({ codigoCliente: Number(codigoCliente), quantidadePedidos: count });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno' });
  }
}

async function getPedidosPorCliente(req, res) {
  try {
    const { codigoCliente } = req.params;
    const pedidos = await Pedido.find({ codigoCliente: Number(codigoCliente) }).sort({ createdAt: -1 });
    return res.json(pedidos);
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno' });
  }
}

module.exports = { getValorTotal, getQuantidadePorCliente, getPedidosPorCliente };
