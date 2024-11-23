const ProductRepository = require("../repository/productRepository");

class ProductService{

    async getAllProduct() {
        return await ProductRepository.findAll();
    }

    async getProductById(id) {
        return await ProductRepository.findById(id);
    }

    async getProductByName(productName){
        return await ProductRepository.findByName(productName);
    }

    async getProductByCategory(category){
        return await ProductRepository.findByCategory();
    }

    async getProductByCategoryId(categoryId){
        return await ProductRepository.findByCategory();
    }


    async createProduct(productData){
        return await ProductRepository.create( productData);
    }

    async updateProduct(id, productData){
        return await ProductRepository.update(id, productData);
    }

    async deleteProduct(id){
        return await ProductRepository.delete(id);
    }
    
}

module.exports = new ProductService();