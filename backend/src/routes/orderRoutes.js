const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const isAuthenticated = require('../middlewares/isAuthenticated');

// Rota para criar um pedido
router.post('/', isAuthenticated, orderController.createOrder);

// Rota para buscar os pedidos do usuário
router.get('/', isAuthenticated, orderController.getOrders);

// Rota para buscar um pedido pelo ID
router.get('/:id', isAuthenticated, orderController.getOrderById);

// Rota para atualizar um pedido
router.put('/:id', isAuthenticated, orderController.updateOrder);

// Rota para deletar um pedido
router.delete('/:id', isAuthenticated, orderController.deleteOrder);

module.exports = router;