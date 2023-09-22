const { validateToken } = require('../middleware/AuthMiddleware');
const {
  createUser,
  getUser,
  updateUsername,
  login,
  actualToken,
} = require('../users/users.controller');

const userRouter = require('express').Router();

userRouter.post('/', createUser);
userRouter.get('/:userId', getUser);
userRouter.put('/', updateUsername);
userRouter.post('/login', login);
userRouter.get('/verify/authToken', validateToken, actualToken);

module.exports = userRouter;
