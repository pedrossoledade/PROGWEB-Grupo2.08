const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserModel {
    async findByEmail(email) {
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    async findByEmailOrCpf(email, cpf) {
        return await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { cpf }
                ]
            }
        });
    }

    async create(userData) {
        return await prisma.user.create({
            data: userData
        });
    }
}

module.exports = new UserModel();