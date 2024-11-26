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
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            }
        });
    }

    async findByCategory(category) {
        return await this.prisma.product.findMany({
            where: {
                categories: {
                    some: {
                        name: {
                            contains: category,
                            mode: 'insensitive'
                        }
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
            data: {
                ...productData,
                categories: {
                    connect: { id: productData.categoryId }
                }
            }
        });
    }

    async update(id, productData) {
        return await this.prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                code: productData.code,
                name: productData.name,
                price: productData.price,
                photo: productData.photo,
                stockQuantity: productData.stockQuantity,
                weight: productData.weight,
                categories: {
                    set: [{ id: productData.categoryId }]
                }
            }
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
