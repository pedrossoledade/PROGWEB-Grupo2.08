const categoryService = require("../services/categoryService");

class CategoryController {
    async getAllCategories(req, res) {
        try {
            const categories = await categoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCategoryById(req, res) {
        try {
            const category = await categoryService.getCategoryById(req.params.id);
            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404).json({ error: "Category not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createCategory(req, res) {
        try {
            const newCategory = await categoryService.createCategory(req.body);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateCategory(req, res) {
        try {
            const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteCategory(req, res) {
        try {
            await categoryService.deleteCategory(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new CategoryController();
