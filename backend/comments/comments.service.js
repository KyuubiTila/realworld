const db = require('../models');
const Comment = db.Comment;

const createCommentService = async (data, userId, articleId) => {
  const { comment } = data;
  try {
    if (typeof comment !== 'string') {
      throw new Error('Comment body must be a string');
    }
    const newComment = await Comment.create({
      body: comment,
      author: userId,
      articleId,
    });
    return newComment;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw new Error('Comment creation failed');
  }
};

const getArticleCommentsService = async (articleId) => {
  try {
    const comments = await Comment.findAll({
      where: { articleId: articleId },
    });
    return comments;
  } catch (error) {
    throw error;
  }
};

const deleteCommentService = async (commentId) => {
  try {
    const deletedComment = await Comment.destroy({ where: { id: commentId } });
    return deletedComment;
  } catch (error) {
    throw new Error('Error deleting comment: ' + error.message);
  }
};

const getAllCommentsService = async () => {
  try {
    const allComments = await Comment.findAll({});
    return allComments;
  } catch (error) {
    throw new Error('Error fetching all comments: ' + error.message);
  }
};

module.exports = {
  createCommentService,
  getArticleCommentsService,
  deleteCommentService,
  getAllCommentsService,
};
