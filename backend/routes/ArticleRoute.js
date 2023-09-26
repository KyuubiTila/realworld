const {
  createArticle,
  getAllArticles,
  getSingleArticle,
} = require('../articles/articles.controller');
const { validateToken } = require('../middleware/AuthMiddleware');

const articleRouter = require('express').Router();

articleRouter.post('/', validateToken, createArticle);
articleRouter.get('/', getAllArticles);
articleRouter.get('/:articleId', getSingleArticle);

module.exports = articleRouter;
