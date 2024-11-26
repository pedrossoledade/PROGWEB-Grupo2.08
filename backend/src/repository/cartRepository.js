class CartRepository {

    constructor(prisma){
        this.prisma = prisma;
    }

    async findCartByUserId(userId) {
        return await this.prisma.cart.findUnique({
            where: { userId: parseInt(userId) },
            include: { 
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }

    async addItemToCart(cartId, productId, quantity) {
        return await this.prisma.cartItem.create({
            data: {
                cartId: parseInt(cartId),
                productId: parseInt(productId),
                quantity
            }
        });
    }

    async removeItemFromCart(cartItemId) {
        return await this.prisma.cartItem.delete({
            where: { id: parseInt(cartItemId) }
        });
    }

    async clearCart(cartId) {
        return await this.prisma.cartItem.deleteMany({
            where: { cartId: parseInt(cartId) }
        });
    }

    async createCart(userId) {
        return await this.prisma.cart.create({
            data: {
                userId: parseInt(userId)
            }
        });
    }
}

module.exports = CartRepository;