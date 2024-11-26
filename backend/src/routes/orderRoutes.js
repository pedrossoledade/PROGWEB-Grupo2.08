const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Rota para criar um pedido
router.post('/', orderController.createOrder);

// Rota para buscar os pedidos do usuário
router.get('/', orderController.getOrders);

module.exports = router;