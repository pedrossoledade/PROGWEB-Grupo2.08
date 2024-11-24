const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Rota para buscar todas as categorias
router.get('/', categoryController.getAllCategories);

// Rota para buscar uma categoria pelo ID
router.get('/:id', categoryController.getCategoryById);

// Rota para criar uma nova categoria
router.post('/', categoryController.createCategory);

// Rota para atualizar uma categoria existente
router.put('/:id', categoryController.updateCategory);

// Rota para deletar uma categoria
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;