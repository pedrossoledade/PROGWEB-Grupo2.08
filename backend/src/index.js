const express = require('express');
const dotenv = require('dotenv');
const testConnection = require('./prisma/testConnection.js');
const userRoutes = require('./routes/userRoutes.js');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Usando as rotas de usuário
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  const msg = 'Hello World';
  res.send(msg);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
