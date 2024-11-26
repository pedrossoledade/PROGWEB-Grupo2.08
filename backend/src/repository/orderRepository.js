class OrderRepository {
    
    constructor(prisma){
        this.prisma = prisma;
    }

    async createOrder(userId, items, total) {
        return await this.prisma.order.create({
            data: {
                userId,
                total,
                items: {
                    create: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                }
            }
        });
    }

    async findOrdersByUserId(userId) {
        return await this.prisma.order.findMany({
            where: { userId },
            include: { items: true }
        });
    }

    async findOrderById(orderId) {
        return await this.prisma.order.findUnique({
            where: { id: parseInt(orderId) }, // Converte orderId para Int
            include: { items: true }
        });
    }

    async updateOrder(orderId, updateData) {
        return await this.prisma.order.update({
            where: { id: parseInt(orderId) }, // Converte orderId para Int
            data: updateData,
            include: { items: true }
        });
    }

    async deleteOrder(orderId) {
        return await this.prisma.order.delete({
            where: { id: parseInt(orderId) } // Converte orderId para Int
        });
    }
}

module.exports = OrderRepository;