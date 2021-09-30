const Sequelize = require("sequelize");

const connection = new Sequelize("postgres://root:password@localhost:5432/db");
connection.authenticate().then(() => console.log("Database connected"));

class User extends Sequelize.Model {}
User.init(
  {
    email: Sequelize.DataTypes.STRING,
    password: Sequelize.DataTypes.STRING,
    lastname: Sequelize.DataTypes.STRING,
    firstname: Sequelize.DataTypes.STRING,
  },
  {
    sequelize: connection,
  }
);

connection.sync();

module.exports = User;
