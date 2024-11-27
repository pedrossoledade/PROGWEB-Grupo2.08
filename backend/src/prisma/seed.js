const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    // Criar usuários
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('password123', 10);

    const user1 = await prisma.user.create({
        data: {
            name: 'John Doe',
            cpf: '123.456.789-00',
            phone: '(11)99999-9999',
            email: 'john.doe@example.com',
            password: hashedPassword1,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Jane Doe',
            cpf: '987.654.321-00',
            phone: '(11)88888-8888',
            email: 'jane.doe@example.com',
            password: hashedPassword2,
        },
    });

    // Criar categorias
    const category1 = await prisma.category.create({
        data: {
            name: 'Eletrônicos',
        },
    });

    const category2 = await prisma.category.create({
        data: {
            name: 'Roupas',
        },
    });

    // Criar produtos
    const products = [
        { code: 'PROD001', name: 'Smartphone', price: 1999.99, stockQuantity: 50, categoryId: category1.id },
        { code: 'PROD002', name: 'Camiseta', price: 49.99, stockQuantity: 100, categoryId: category2.id },
        { code: 'PROD003', name: 'Notebook', price: 2999.99, stockQuantity: 30, categoryId: category1.id },
        { code: 'PROD004', name: 'Tablet', price: 999.99, stockQuantity: 40, categoryId: category1.id },
        { code: 'PROD005', name: 'Fone de Ouvido', price: 199.99, stockQuantity: 200, categoryId: category1.id },
        { code: 'PROD006', name: 'Mouse', price: 79.99, stockQuantity: 150, categoryId: category1.id },
        { code: 'PROD007', name: 'Teclado', price: 129.99, stockQuantity: 120, categoryId: category1.id },
        { code: 'PROD008', name: 'Monitor', price: 899.99, stockQuantity: 60, categoryId: category1.id },
        { code: 'PROD009', name: 'Impressora', price: 499.99, stockQuantity: 70, categoryId: category1.id },
        { code: 'PROD010', name: 'Câmera', price: 1499.99, stockQuantity: 25, categoryId: category1.id },
        { code: 'PROD011', name: 'Smartwatch', price: 799.99, stockQuantity: 80, categoryId: category1.id },
        { code: 'PROD012', name: 'Jaqueta', price: 199.99, stockQuantity: 90, categoryId: category2.id },
    ];

    for (const product of products) {
        await prisma.product.create({
            data: {
                code: product.code,
                name: product.name,
                price: product.price,
                stockQuantity: product.stockQuantity,
                categories: {
                    connect: { id: product.categoryId },
                },
            },
        });
    }

    // Criar carrinhos
    const cart1 = await prisma.cart.create({
        data: {
            userId: user1.id,
        },
    });

    const cart2 = await prisma.cart.create({
        data: {
            userId: user2.id,
        },
    });

    // Adicionar itens ao carrinho
    await prisma.cartItem.create({
        data: {
            cartId: cart1.id,
            productId: 1, // ID do produto Smartphone
            quantity: 2,
        },
    });

    await prisma.cartItem.create({
        data: {
            cartId: cart2.id,
            productId: 2, // ID do produto Camiseta
            quantity: 3,
        },
    });

    console.log('Banco de dados populado com sucesso!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });