const express = require('express');
const dotenv = require('dotenv');
const testConnection = require('./prisma/testConnection.js');
const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const PORT = process.env.PORT_APP || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROTAS
// rotas de usuário
app.use('/user', userRoutes);
// rotas de produto
app.use('/', productRoutes)
// rotas de categoria dentro de produto
app.use('/product/categories', categoryRoutes);

app.get('/', (req, res) => {
  const msg = 'Hello World';
  res.send(msg);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
