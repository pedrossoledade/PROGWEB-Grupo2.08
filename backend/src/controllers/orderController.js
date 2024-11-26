const orderService = require('../services/orderService');

class OrderController {
    async createOrder(req, res) {
        try {
            const order = await orderService.createOrder(req.user.id);
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOrders(req, res) {
        try {
            const orders = await orderService.getOrdersByUserId(req.user.id);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new OrderController();
