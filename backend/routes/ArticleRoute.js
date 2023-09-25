const { createArticle } = require('../articles/articles.controller');
const { validateToken } = require('../middleware/AuthMiddleware');

const articleRouter = require('express').Router();

articleRouter.post('/', validateToken, createArticle);

module.exports = articleRouter;
