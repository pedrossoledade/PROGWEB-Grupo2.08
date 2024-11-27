class OrderRepository {
    
    constructor(prisma){
        this.prisma = prisma;
    }

    async createOrder(userId, items, total) {
        return await this.prisma.order.create({
            data: {
                userId: parseInt(userId),
                total,
                status: 'pending', 
                items: {
                    create: items.map(item => ({
                        productId: parseInt(item.productId),
                        quantity: item.quantity
                    }))
                }
            }
        });
    }

    async findOrdersByUserId(userId) {
        return await this.prisma.order.findMany({
            where: { userId: parseInt(userId) },
            include: { 
                items: {
                    include: {
                        product: true // Inclui os detalhes do produto
                    }
                }
            }
        });
    }

    async findOrderById(orderId) {
        return await this.prisma.order.findUnique({
            where: { id: parseInt(orderId) }, // Converte orderId para Int
            include: { 
                items: {
                    include: {
                        product: true // Inclui os detalhes do produto
                    }
                }
            }
        });
    }

    async updateOrder(orderId, updateData) {
        return await this.prisma.order.update({
            where: { id: parseInt(orderId) }, // Converte orderId para Int
            data: updateData,
            include: { 
                items: {
                    include: {
                        product: true // Inclui os detalhes do produto
                    }
                }
            }
        });
    }

    async deleteOrder(orderId) {
        return await this.prisma.order.delete({
            where: { id: parseInt(orderId) } // Converte orderId para Int
        });
    }
}

module.exports = OrderRepository;