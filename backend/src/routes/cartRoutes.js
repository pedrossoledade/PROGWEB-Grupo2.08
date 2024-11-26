const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const isAuthenticated = require('../middlewares/isAuthenticated');

// Rota para buscar o carrinho do usuário
router.get('/', isAuthenticated, cartController.getCart);

// Rota para adicionar um item ao carrinho
router.post('/', isAuthenticated, cartController.addItem);

// Rota para remover um item do carrinho
router.delete('/:id', isAuthenticated, cartController.removeItem);

// Rota para limpar o carrinho
router.delete('/', isAuthenticated, cartController.clearCart);

module.exports = router;