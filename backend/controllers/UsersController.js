const db = require('../models');
const Users = db.Users;

const bcrypt = require('bcryptjs');

const { sign } = require('jsonwebtoken');

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
    res.status(500).send({ error: 'User creation failed' });
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

// UPDATE USER
const updateUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
      throw new Error('Database error: User not found');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new Error('Database error: Incorrect password');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const updatedUser = await Users.update(
      {
        username: username,
        email: email,
        password: passwordHash,
      },
      { where: { email: email } }
    );

    res
      .status(200)
      .json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    console.error('Error while updating user:', error);
    return next(error);
  }
};

//LOGIN USER
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const findUser = await Users.findOne({ where: { email: email } });

    if (!findUser) {
      throw new Error('Database error: User not found');
    } else {
      const checkPassword = await bcrypt.compare(password, findUser.password);
      if (checkPassword) {
        const accessToken = sign(
          {
            email: findUser.email,
            id: findUser.id,
            username: findUser.username,
          },
          'realworldsecret',
          { expiresIn: '30d' }
        );
        return res.json({
          token: accessToken,
          email: findUser.email,
          id: findUser.id,
          username: findUser.username,
        });
      } else {
        throw new Error('Incorrect password');
      }
    }
  } catch (error) {
    console.error('Error during login:', error);
    return next(error);
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  login,
};
