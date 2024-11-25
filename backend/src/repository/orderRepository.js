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
}

module.exports = OrderRepository;