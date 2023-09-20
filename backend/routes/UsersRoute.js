const {
  createUser,
  getUser,
  updateUser,
  login,
} = require('../controllers/UsersController');

const userRouter = require('express').Router();

userRouter.post('/', createUser);
userRouter.get('/:userId', getUser);
userRouter.put('/', updateUser);
userRouter.post('/login', login);

module.exports = userRouter;
