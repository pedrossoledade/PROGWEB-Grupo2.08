const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rota para buscar todos os produtos
router.get('/', productController.getAllProducts);

// Rota para buscar um produto pelo ID
router.get('/findById/:id', productController.getProductById);

// Rota para buscar produtos pelo nome
router.get('/name/:name', productController.getProductByName);

// Rota para buscar produtos por nome de categoria
router.get('/findByCategory/:category', productController.getProductByCategory);

// Rota para buscar produtos pelo ID da categoria
router.get('/findByCategoryId/:categoryId', productController.getProductByCategoryId);

// Rota para criar um novo produto
router.post('/', productController.createProduct);

// Rota para atualizar um produto existente
router.put('/:id', productController.updateProduct);

// Rota para deletar um produto
router.delete('/:id', productController.deleteProduct);

module.exports = router;
