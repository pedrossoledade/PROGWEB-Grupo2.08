const ProductRepository = require("../repository/productRepository");
const prisma = require("../prisma/prismaClient");

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository(prisma);
    }

    async getAllProduct() {
        return await this.productRepository.findAll();
    }

    async getProductById(id) {
        return await this.productRepository.findById(id);
    }

    async getProductByName(productName) {
        return await this.productRepository.findByName(productName);
    }

    async getProductByCategory(category) {
        return await this.productRepository.findByCategory(category);
    }

    async getProductByCategoryId(categoryId) {
        return await this.productRepository.findByCategoryId(categoryId);
    }

    async createProduct(productData) {
        return await this.productRepository.create(productData);
    }

    async updateProduct(id, productData) {
        return await this.productRepository.update(id, productData);
    }

    async deleteProduct(id) {
        return await this.productRepository.delete(id);
    }
}

module.exports = new ProductService();