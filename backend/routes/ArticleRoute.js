const {
  createArticle,
  getAllArticles,
  getSingleArticle,
  toggleLikesOfPost,
  toggleUnlikesOfPost,
} = require('../articles/articles.controller');
const { validateToken } = require('../middleware/AuthMiddleware');

const articleRouter = require('express').Router();

articleRouter.post('/', validateToken, createArticle);
articleRouter.get('/', getAllArticles);
articleRouter.get('/:articleId', getSingleArticle);
articleRouter.get('/like/:articleId', validateToken, toggleLikesOfPost);
articleRouter.get('/unlike/:articleId', validateToken, toggleUnlikesOfPost);

module.exports = articleRouter;
