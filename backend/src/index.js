const express = require('express');
const dotenv = require('dotenv');
const testConnection = require('./prisma/testConnection.js');
const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');



// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const PORT = process.env.PORT_APP || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROTAS
// rotas de usuário
app.use('/users', userRoutes);
// rotas de produto
app.use('/products', productRoutes)
// rotas de categoria dentro de produto
app.use('/products/categories', categoryRoutes);
// rotas de carrinho
app.use('/cart', cartRoutes);
// rotas de pedidos
app.use('/orders', orderRoutes);


app.get('/', (req, res) => {
  const msg = 'Hello World';
  res.send(msg);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
