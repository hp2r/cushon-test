const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 5000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const readUser = () => {
  const data = fs.readFileSync('user.json');
  return JSON.parse(data);
};

const writeUser = (user) => {
  fs.writeFileSync('user.json', JSON.stringify(user, null, 2));
};

const readProducts = () => {
  const data = fs.readFileSync('products.json');
  return JSON.parse(data);
};

app.get('/api/user', (req, res) => {
  const user = readUser();
  res.json(user);
});

app.get('/api/products', (req, res) => {
  const products = readProducts();
  res.json(products);
});

app.patch('/api/user', (req, res) => {
  const user = readUser();

  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Missing or invalid user data' });
  }

  const updatedUser = { ...user, ...req.body };

  writeUser(updatedUser);
  res.json(updatedUser);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
