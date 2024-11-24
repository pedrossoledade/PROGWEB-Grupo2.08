const categoryRepository = require("../repository/categoryRepository");
const prisma = require("../prisma/prismaClient");

class CategoryService {
    constructor() {
        this.categoryRepository = new categoryRepository(prisma);
    }

    async getAllCategories() {
        return await this.categoryRepository.findAll();
    }

    async getCategoryById(id) {
        return await this.categoryRepository.findById(id);
    }

    async createCategory(categoryData) {
        return await this.categoryRepository.create(categoryData);
    }

    async updateCategory(id, categoryData) {
        return await this.categoryRepository.update(id, categoryData);
    }

    async deleteCategory(id) {
        return await this.categoryRepository.delete(id);
    }
}

module.exports = new CategoryService();