const {
  createArticle,
  getAllArticles,
  getSingleArticle,
  toggleLikesOfPost,
  toggleUnlikesOfPost,
  allLikes,
} = require('../articles/articles.controller');
const { validateToken } = require('../middleware/AuthMiddleware');

const articleRouter = require('express').Router();

articleRouter.post('/', validateToken, createArticle);
articleRouter.get('/', getAllArticles);
articleRouter.get('/:articleId', getSingleArticle);
articleRouter.get('/like/:articleId', validateToken, toggleLikesOfPost);
articleRouter.get('/unlike/:articleId', validateToken, toggleUnlikesOfPost);
articleRouter.get('/allLikes/getAll', validateToken, allLikes);

module.exports = articleRouter;
