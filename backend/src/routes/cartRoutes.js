const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Rota para buscar o carrinho do usuário
router.get('/', cartController.getCart);

// Rota para adicionar um item ao carrinho
router.post('/items', cartController.addItem);

// Rota para remover um item do carrinho
router.delete('/items/:id', cartController.removeItem);

// Rota para limpar o carrinho
router.delete('/clear', cartController.clearCart);

module.exports = router;