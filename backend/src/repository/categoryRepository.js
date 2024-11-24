class CategoryRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async findAll() {
        return await this.prisma.category.findMany();
    }

    async findById(id) {
        return await this.prisma.category.findUnique({
            where: {  id: parseInt(id) }
        });
    }

    async create(categoryData) {
        return await this.prisma.category.create({
            data: categoryData
        });
    }

    async update(id, categoryData) {
        return await this.prisma.category.update({
            where: {  id: parseInt(id) },
            data: categoryData
        });
    }

    async delete(id) {
        return await this.prisma.category.delete({
            where: { id: parseInt(id) }
        });
    }
}

module.exports = CategoryRepository;