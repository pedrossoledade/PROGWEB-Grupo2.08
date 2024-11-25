class ProductRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async findAll() {
        return await this.prisma.product.findMany();
    }

    async findById(id) {
        return await this.prisma.product.findUnique({
            where: { id }
        });
    }

    async findByName(name) {
        return await this.prisma.product.findMany({
            where: { name }
        });
    }

    async findByCategory(category) {
        return await this.prisma.product.findMany({
            where: { category }
        });
    }

    async findByCategoryId(categoryId) {
        return await this.prisma.product.findMany({
            where: { categoryId }
        });
    }

    async create(productData) {
        return await this.prisma.product.create({
            data: productData
        });
    }

    async update(id, productData) {
        return await this.prisma.product.update({
            where: { id },
            data: productData
        });
    }

    async delete(id) {
        return await this.prisma.product.delete({
            where: { id }
        });
    }

    async updateStock(productId, quantity) {
        const product = await this.findById(productId);
        return await this.prisma.product.update({
            where: { id: productId },
            data: { stockQuantity: product.stockQuantity - quantity }
        });
    }
}

module.exports = ProductRepository;