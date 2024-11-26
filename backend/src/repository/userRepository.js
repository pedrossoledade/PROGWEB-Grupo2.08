class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async findByEmail(email) {
        return await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }

    async findByEmailOrCpf(email, cpf) {
        return await this.prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: email
                    },
                    {
                        cpf: cpf
                    }
                ]
            }
        });
    }

    async create(userData) {
        return await this.prisma.user.create({
            data: userData
        });
    }
}

module.exports = UserRepository;