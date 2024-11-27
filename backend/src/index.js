const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');

dotenv.config();

const PORT = process.env.PORT_APP || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar sessões
app.use(session({
  secret: process.env.SECRET || "grupo_revelacao_deixaAcontecerNaturalmenteEuNaoQueroVerVoceChorarDeixaQueOAmorEncontreAGente",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Use secure: true em produção com HTTPS
}));

//ROTAS
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/products/categories', categoryRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
  const msg = 'Hello World';
  res.send(msg);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
