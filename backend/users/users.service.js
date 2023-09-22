const db = require('../models');
const Users = db.Users;
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');

// Service function to create a user
const userRegisterSevice = async (userData) => {
  try {
    const { username, email, password } = userData;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      username: username,
      email: email,
      password: passwordHash,
    });
    return newUser;
  } catch (error) {
    console.error('Error while creating user:', error);
    throw new Error('User creation failed');
  }
};

const getUserService = async (userId) => {
  try {
    const user = await Users.findOne({ where: { id: userId } });
    return user;
  } catch (error) {
    console.error('Error while fetching user details:', error);
    throw new Error('Error while fetching user details');
  }
};

const updateUsernameService = async (userdata) => {
  const { email, password, username } = userdata;
  try {
    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
      throw new Error('User not found');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new Error('Incorrect password');
    }

    const updatedUser = await Users.update(
      { username },
      { where: { id: user.id } }
    );

    return updatedUser;
  } catch (error) {
    console.error('Error while updating username:', error);
    throw new Error('Error while updating username');
  }
};

const loginService = async (data) => {
  const { email, password } = data;
  try {
    const findUser = await Users.findOne({ where: { email: email } });

    if (!findUser) {
      throw new Error('User not found');
    }

    const checkPassword = await bcrypt.compare(password, findUser.password);

    if (!checkPassword) {
      throw new Error('Incorrect password');
    }

    const access_token = sign(
      {
        email: findUser.email,
        id: findUser.id,
        username: findUser.username,
      },
      process.env.JWT_SECRET
    );

    return {
      token: access_token,
      email: findUser.email,
      id: findUser.id,
      username: findUser.username,
    };
  } catch (error) {
    console.error('Invalid Login Credentials:', error);
    throw new Error('Invalid Login Credentials');
  }
};

module.exports = {
  userRegisterSevice,
  getUserService,
  updateUsernameService,
  loginService,
};
