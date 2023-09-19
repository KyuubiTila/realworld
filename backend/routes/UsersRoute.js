const {
  createUser,
  getUser,
  updateUser,
} = require('../controllers/UsersController');

const userRouter = require('express').Router();

userRouter.post('/', createUser);
userRouter.get('/:userId', getUser);
userRouter.put('/', updateUser);

module.exports = userRouter;
