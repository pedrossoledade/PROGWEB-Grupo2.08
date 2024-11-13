const express = require('express');
const userService = require('../services/userService');

const router = express.Router();


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();

// Chave secreta para assinar o token JWT
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
        const result = await userService.register(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(error.message.includes('já existe') ? 400 : 500)
           .json({ message: error.message || 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const result = await userService.login(req.body);
        res.json(result);
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(error.message.includes('obrigatório') ? 400 : 401)
           .json({ message: error.message || 'Internal server error' });
    }
});

module.exports = router;
