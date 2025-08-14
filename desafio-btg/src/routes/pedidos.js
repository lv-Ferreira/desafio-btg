const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/pedido.controller');

router.get('/pedido/:codigoPedido', ctrl.getValorTotal);
router.get('/cliente/:codigoCliente/quantidade', ctrl.getQuantidadePorCliente);
router.get('/cliente/:codigoCliente/pedidos', ctrl.getPedidosPorCliente);

module.exports = router;
