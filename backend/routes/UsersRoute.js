const { createUser, getUser } = require('../controllers/UsersController');

const userRouter = require('express').Router();

userRouter.post('/', createUser);
userRouter.get('/:userId', getUser);

module.exports = userRouter;
