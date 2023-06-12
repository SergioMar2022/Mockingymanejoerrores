const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ocurrió un error en el servidor');
});

// Ruta para generar productos falsos usando el módulo de mocking
app.get('/mockingproducts', (req, res, next) => {
  const products = Array.from({ length: 100 }, () => ({
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
  }));

  res.json(products);
});

// Ruta de ejemplo para simular un error al crear un producto
app.post('/createproduct', (req, res, next) => {
  // Simulamos un error al crear el producto
  const error = new Error('Error al crear el producto');
  next(error);
});

// Ruta de ejemplo para simular un error al agregar un producto al carrito
app.post('/addtocart', (req, res, next) => {
  // Simulamos un error al agregar el producto al carrito
  const error = new Error('Error al agregar el producto al carrito');
  next(error);
});

// Ruta de ejemplo para manejar otros tipos de errores
app.get('/othererror', (req, res, next) => {
  // Simulamos otro tipo de error
  throw new Error('Otro tipo de error');
});

// Manejador de errores global
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
