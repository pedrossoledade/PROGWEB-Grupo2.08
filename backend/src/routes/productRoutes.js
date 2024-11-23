const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Rota para buscar todos os produtos
router.get('/products', ProductController.getAllProducts);

// Rota para buscar um produto pelo ID
router.get('/products/:id', ProductController.getProductById);

// Rota para buscar produtos pelo nome
router.get('/products/name/:name', ProductController.getProductByName);

// Rota para buscar produtos por nome de categoria
router.get('/products/category/:category', ProductController.getProductByCategory);

// Rota para buscar produtos pelo ID da categoria
router.get('/products/categoryId/:categoryId', ProductController.getProductByCategoryId);

// Rota para criar um novo produto
router.post('/products', ProductController.createProduct);

// Rota para atualizar um produto existente
router.put('/products/:id', ProductController.updateProduct);

// Rota para deletar um produto
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;
