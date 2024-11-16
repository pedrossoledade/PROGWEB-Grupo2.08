const { PrismaClient } = require('../prisma/client');
const prisma = new PrismaClient();

class ProductRepository {
    async findAll() {
        return await prisma.product.findMany();
    }

    async findById(id) {
        return await prisma.product.findUnique({
            where: { id }
        });
    }

    async findByCategory(category) {
        return await prisma.product.findMany({
            where: {
                categories: {
                    some: { name: category }
                }
            }
        });
    }

    async findByCategoryId(categoryId) {
        return await prisma.product.findMany({
            where: {
                categories: {
                    some: { id: categoryId }
                }
            }
        });
    }

    async create(productData) {
            return await prisma.product.create({
                data: productData
            });
        }

    async update(id, productData) {
            return await prisma.product.update({
                where: { id },
                data: productData
            });
        }

    async delete (id) {
            return await prisma.product.delete({
                where: { id }
            });
        }
    }

module.exports = new ProductRepository();