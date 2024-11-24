const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rota para buscar todos os produtos
router.get('/products', productController.getAllProducts);

// Rota para buscar um produto pelo ID
router.get('/products/:id', productController.getProductById);

// Rota para buscar produtos pelo nome
router.get('/products/name/:name', productController.getProductByName);

// Rota para buscar produtos por nome de categoria
router.get('/products/category/:category', productController.getProductByCategory);

// Rota para buscar produtos pelo ID da categoria
router.get('/products/categoryId/:categoryId', productController.getProductByCategoryId);

// Rota para criar um novo produto
router.post('/products', productController.createProduct);

// Rota para atualizar um produto existente
router.put('/products/:id', productController.updateProduct);

// Rota para deletar um produto
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
