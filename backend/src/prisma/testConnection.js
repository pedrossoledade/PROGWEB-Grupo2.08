const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        // Testa a conexão com o banco de dados
        await prisma.$connect();
        console.log('Conexão com o banco de dados bem-sucedida!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    } finally {
        // Desconecta do banco de dados
        await prisma.$disconnect();
    }
}

main();