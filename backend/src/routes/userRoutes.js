const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();
const prisma = new PrismaClient();

// Chave secreta para assinar o token JWT
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  console.log(req.body);
  const { name, cpf, phone, email, password, confirmPassword } = req.body;

  if (!name || !cpf || !phone || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Os campos: nome, cpf, telefone, email, senha e confirmaSenha são obrigatórios' });
  }

  try {
    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'As senhas não coincidem' });
    }

    // Verificar se o usuário já existe (email ou CPF)
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email: email },
                { cpf: cpf }
            ]
        }
    });
    console.log('existingUser:', existingUser);

    if (existingUser) {
        const field = existingUser.email === email ? 'email' : 'CPF';
        console.log(`User already exists with ${field}`);
        return res.status(400).json({ message: `Usuário já existe com este ${field}` });
    }

    // Encriptar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const newUser = await prisma.user.create({
      data: {
        name: name,
        cpf,
        phone: phone,
        email,
        password: hashedPassword
      }
    });

    // Gerar um token JWT
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

    // Enviar o token como resposta[
    console.log('Token:', token);
    console.log('Usuário registrado com sucesso');
    res.status(201).json({token, message: 'Usuário registrado com sucesso'});
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  
  if (!email) {
    return res.status(400).json({ message: 'O campo email é obrigatório' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo senha é obrigatório' });
  }
  
  console.log('email:', email);
  console.log('password:', password)

  try {
    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar um token JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Token:', token);
    console.log("Login realizado com sucesso");
    // Enviar o token como resposta
    res.json({token, message: 'Login realizado com sucesso'});
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
