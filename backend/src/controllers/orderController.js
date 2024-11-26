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

    async getOrderById(req, res) {
        try {
            const order = await orderService.getOrderById(req.params.id);
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateOrder(req, res) {
        try {
            const order = await orderService.updateOrder(req.params.id, req.body);
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteOrder(req, res) {
        try {
            await orderService.deleteOrder(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new OrderController();
