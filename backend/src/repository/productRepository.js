class ProductRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async findAll() {
        return await this.prisma.product.findMany();
    }

    async findById(id) {
        return await this.prisma.product.findUnique({
            where: { id: parseInt(id) }
        });
    }

    async findByName(name) {
        return await this.prisma.product.findMany({
            where: { name }
        });
    }

    async findByCategory(category) {
        return await this.prisma.product.findMany({
            where: {
                categories: {
                    some: {
                        name: category
                    }
                }
            }
        });
    }

    async findByCategoryId(categoryId) {
        return await this.prisma.product.findMany({
            where: {
                categories: {
                    some: {
                        id: parseInt(categoryId)
                    }
                }
            }
        });
    }

    async create(productData) {
        return await this.prisma.product.create({
            data: productData
        });
    }

    async update(id, productData) {
        return await this.prisma.product.update({
            where: { id: parseInt(id) },
            data: productData
        });
    }

    async delete(id) {
        return await this.prisma.product.delete({
            where: { id: parseInt(id) }
        });
    }

    async updateStock(productId, quantity) {
        return await this.prisma.product.update({
            where: { id: parseInt(productId) },
            data: {
                stockQuantity: {
                    decrement: quantity
                }
            }
        });
    }
}

module.exports = ProductRepository;
