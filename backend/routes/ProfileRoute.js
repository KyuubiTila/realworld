const { validateToken } = require('../middleware/AuthMiddleware');
const { createProfile } = require('../profiles/profile.controller');

const profileRouter = require('express').Router();

profileRouter.post('/', validateToken, createProfile);

module.exports = profileRouter;
