const express = require('express');
const User = require('./models/User');

const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
  User.findAll().then((data) => res.json(data));
});

app.post('/users', (req, res) => {
  User.create(req.body).then((data) => res.status(201).json(data));
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByPk(id).then((data) => res.json(data));
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;

  User.update(req.body, {
    where: {
      id,
    },
    returning: true,
  }).then(([, [data]]) => res.json(data));
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  User.destroy({
    where: { id },
  }).then(() => res.sendStatus(204));
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
