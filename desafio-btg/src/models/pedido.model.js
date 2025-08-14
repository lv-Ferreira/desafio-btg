const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  produto: { type: String, required: true },
  quantidade: { type: Number, required: true },
  preco: { type: Number, required: true }
}, { _id: false });

const PedidoSchema = new mongoose.Schema({
  codigoPedido: { type: Number, required: true, unique: true },
  codigoCliente: { type: Number, required: true, index: true },
  itens: { type: [ItemSchema], required: true },
  valorTotal: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
