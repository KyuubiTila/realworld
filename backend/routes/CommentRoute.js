const {
  createComment,
  getArticleComments,
  deleteArticleComment,
  getAllComments,
} = require('../comments/comments.controller');
const { validateToken } = require('../middleware/AuthMiddleware');

const commentRouter = require('express').Router();

commentRouter.post('/:articleId', validateToken, createComment);
commentRouter.get('/:articleId', getArticleComments);
commentRouter.delete('/:commentId', deleteArticleComment);
commentRouter.get('/', getAllComments);

module.exports = commentRouter;
