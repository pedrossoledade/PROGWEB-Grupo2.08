const CartRepository = require('../repository/cartRepository');
const prisma = require("../prisma/prismaClient");

class CartService {
    constructor() {
        this.cartRepository = new CartRepository(prisma);
    }

    async getCartByUserId(userId) {
        return await this.cartRepository.findCartByUserId(userId);
    }

    async addItemToCart(userId, productId, quantity) {
        const cart = await this.cartRepository.findCartByUserId(userId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        return await this.cartRepository.addItemToCart(cart.id, productId, quantity);
    }

    async removeItemFromCart(cartItemId) {
        return await this.cartRepository.removeItemFromCart(cartItemId);
    }

    async clearCart(userId) {
        const cart = await this.cartRepository.findCartByUserId(userId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        return await this.cartRepository.clearCart(cart.id);
    }
}

module.exports = new CartService();