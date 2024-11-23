const ProductService = require("../services/productService");

class ProductController{
    
    async getAllProducts(req, res){
        try{
            const products = await ProductService.getAllProducts();
            res.status(200).json(products);
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }
    
    async getProductById(req, res){
        try{
            const product = await ProductService.getProductById(req.params.id);
            if (product){
                res.status(200).json(product);
            } else{
                res.status(404).json({error: "Product not found "});
            }
        }catch(error){
            res.status(500).json({error: error.message})
        };
    }

    async getProductByName(req, res) {
        try {
            const products = await ProductService.getProductByName(req.params.name);
            res.status(200).json(products); // 200 OK
        } catch (error) {
            res.status(500).json({ error: error.message }); // 500 Internal Server Error
        }
    }

    async getProductByCategory(req, res) {
        try {
            const products = await ProductService.getProductByCategory(req.params.category);
            res.status(200).json(products); // 200 OK
        } catch (error) {
            res.status(500).json({ error: error.message }); // 500 Internal Server Error
        }
    }

    async getProductByCategoryId(req, res) {
        try {
            const products = await ProductService.getProductByCategoryId(req.params.categoryId);
            res.status(200).json(products); // 200 OK
        } catch (error) {
            res.status(500).json({ error: error.message }); // 500 Internal Server Error
        }
    }


    async createProduct(req, res){
        try {
            const newProduct = await ProductService.createProduct(req.body);
            req.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async updateProduct(req, res){
        try {
            const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async deleteProduct(req, res) {
        try {
            await ProductService.deleteProduct(req.params.id);
            res.sendStatus(204); // 204 No Content
        } catch (error) {
            res.status(500).json({ error: error.message }); // 500 Internal Server Error
        }
    }

}

module.exports = new ProductController();
