class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async findByEmail(email) {
        return await this.prisma.user.findUnique({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive'
                }
            }
        });
    }

    async findByEmailOrCpf(email, cpf) {
        return await this.prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: {
                            equals: email,
                            mode: 'insensitive'
                        }
                    },
                    {
                        cpf: {
                            equals: cpf,
                            mode: 'insensitive'
                        }
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