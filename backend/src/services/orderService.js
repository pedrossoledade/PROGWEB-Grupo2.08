const OrderRepository = require('../repository/orderRepository');
const CartService = require('./cartService');
const ProductRepository = require('../repository/productRepository');
const prisma = require('../prisma/prismaClient');

class OrderService {
    constructor() {
        this.orderRepository = new OrderRepository(prisma);
        this.productRepository = new ProductRepository(prisma);
    }

    async createOrder(userId) {
        const cart = await CartService.getCartByUserId(userId);
        if (!cart || cart.items.length === 0) {
            throw new Error('Cart is empty');
        }

        // Verificar se a quantidade solicitada está disponível no estoque
        for (const item of cart.items) {
            const product = await this.productRepository.findById(item.productId);
            if (product.stockQuantity < item.quantity) {
                throw new Error(`Insufficient stock for product ${product.name}`);
            }
        }

        const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const order = await this.orderRepository.createOrder(userId, cart.items, total);

        // Atualizar o estoque dos produtos
        for (const item of cart.items) {
            await this.productRepository.updateStock(item.productId, item.quantity);
        }

        await CartService.clearCart(userId);

        return order;
    }

    async getOrdersByUserId(userId) {
        return await this.orderRepository.findOrdersByUserId(userId);
    }
}

module.exports = new OrderService();