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

/*
app.post('/api/user', (req, res) => {
  const users = readUsers();
  const newUser = req.body;
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});
*/

app.patch('/api/user', (req, res) => {
  const user = readUser();
  const id = parseInt(req.params.id, 10);

  //if (isNaN(id) || id < 0 || id >= users.length) {
  //  return res.status(400).json({ error: 'Invalid user id' });
  //}

  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Missing or invalid user data' });
  }

  const updatedUser = { ...user, ...req.body };
  //user = updatedUser;

  writeUser(updatedUser);
  res.json(updatedUser);
});

/*
app.delete('/api/users/:id', (req, res) => {
  const users = readUsers();
  const id = parseInt(req.params.id, 10);
  if (id >= 0 && id < users.length) {
    const deletedUser = users.splice(id, 1);
    writeUsers(users);
    res.json(deletedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});
*/

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
