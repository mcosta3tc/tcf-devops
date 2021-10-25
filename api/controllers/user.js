const User = require("../models/User");

const UserController = {};

UserController.getUsers = (req, res) => {
  User.findAll(req.query).then((data) => res.json(data));
};

UserController.post = (req, res) => {
  User.create(req.body).then((data) => res.status(201).json(data));
};

UserController.getUser = (req, res) => {
  const { id } = req.params;
  User.findByPk(id).then((data) => res.json(data));
};

UserController.put = (req, res) => {
  const { id } = req.params;

  User.update(req.body, {
    where: {
      id,
    },
    returning: true,
  }).then(([, [data]]) => res.json(data));
};

UserController.delete = (req, res) => {
  const { id } = req.params;

  User.destroy({
    where: { id },
  }).then(() => res.sendStatus(204));
};

module.exports = UserController;
