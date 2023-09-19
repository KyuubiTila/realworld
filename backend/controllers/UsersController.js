const db = require('../models');
const Users = db.Users;

const bcrypt = require('bcryptjs');

// CREATE USER
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const userData = await Users.create({
      username: username,
      email: email,
      password: passwordHash,
    });
    res.status(201).send(userData);
  } catch (error) {
    console.error('Error while creating user:', error);
    return next(error);
  }
};

// GET USER
const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Users.findOne({ where: { id: userId } });

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user.');
  }
};

module.exports = {
  createUser,
  getUser,
};
