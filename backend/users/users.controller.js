const {
  userRegisterSevice,
  getUserService,
  updateUsernameService,
  loginService,
} = require('./users.service');

// CREATE USER
const createUser = async (req, res, next) => {
  const userData = req.body; // validation your data before using it
  try {
    const userCreated = await userRegisterSevice(userData);
    res
      .status(200)
      .json({ message: 'User created successfully', data: userCreated });
  } catch (error) {
    console.error('Error while creating user:', error);
    return next(error);
  }
};

// GET USER
const getUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const userGotten = await getUserService(userId);
    res
      .status(200)
      .json({ message: 'User created successfully', data: userGotten });
  } catch (error) {
    console.error('Error fetching user:', error);
    return next(error);
  }
};

// UPDATE USERNAME
const updateUsername = async (req, res, next) => {
  const userdata = req.body;

  try {
    const updatedUser = await updateUsernameService(userdata);

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
  const data = req.body;

  try {
    const userData = await loginService(data);

    res.json(userData);
  } catch (error) {
    console.error('Error during login:', error);
    return next(error);
  }
};

// ACTUAL LOGGED IN USER
const actualToken = (req, res) => {
  res.json(req.user);
};

module.exports = {
  createUser,
  getUser,
  updateUsername,
  login,
  actualToken,
};
