class CartRepository {

    constructor(prisma){
        this.prisma = prisma;
    }

    async findCartByUserId(userId) {
        return await this.prisma.cart.findUnique({
            where: { userId },
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
                cartId,
                productId,
                quantity
            }
        });
    }

    async removeItemFromCart(cartItemId) {
        return await this.prisma.cartItem.delete({
            where: { id: cartItemId }
        });
    }

    async clearCart(cartId) {
        return await this.prisma.cartItem.deleteMany({
            where: { cartId }
        });
    }

    async createCart(userId) {
        return await this.prisma.cart.create({
            data: {
                userId
            }
        });
    }
}

module.exports = CartRepository;