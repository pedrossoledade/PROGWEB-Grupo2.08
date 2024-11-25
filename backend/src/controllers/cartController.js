const cartService = require('../services/cartService');

class CartController {
    async getCart(req, res) {
        try {
            const cart = await cartService.getCartByUserId(req.user.id);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addItem(req, res) {
        try {
            const { productId, quantity } = req.body;
            const cartItem = await cartService.addItemToCart(req.user.id, productId, quantity);
            res.status(201).json(cartItem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeItem(req, res) {
        try {
            await cartService.removeItemFromCart(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async clearCart(req, res) {
        try {
            await cartService.clearCart(req.user.id);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new CartController();
