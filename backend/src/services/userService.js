const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/userRepository');
const prisma = require('../prisma/prismaClient');

class UserService {
    constructor() {
        this.userRepository = new UserRepository(prisma);
        this.JWT_SECRET = process.env.JWT_SECRET;
    }

    async register(userData) {
        const { name, cpf, phone, email, password, confirmPassword } = userData;

        if (!name || !cpf || !phone || !email || !password || !confirmPassword) {
            throw new Error('Os campos: nome, cpf, telefone, email, senha e confirmaSenha são obrigatórios');
        }

        if (password !== confirmPassword) {
            throw new Error('As senhas não coincidem');
        }

        const existingUser = await this.userRepository.findByEmailOrCpf(email, cpf);
        if (existingUser) {
            const field = existingUser.email === email ? 'email' : 'CPF';
            throw new Error(`Usuário já existe com este ${field}`);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userRepository.create({
            name,
            cpf,
            phone,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ userId: newUser.id }, this.JWT_SECRET, { expiresIn: '1h' });
        return { token, message: 'Usuário registrado com sucesso' };
    }

    async login(credentials) {
        const { email, password } = credentials;

        if (!email) {
            throw new Error('O campo email é obrigatório');
        }
        if (!password) {
            throw new Error('O campo senha é obrigatório');
        }

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Credenciais inválidas');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas');
        }

        const token = jwt.sign({ userId: user.id }, this.JWT_SECRET, { expiresIn: '1h' });
        return { token, message: 'Login realizado com sucesso' };
    }
}

module.exports = new UserService();