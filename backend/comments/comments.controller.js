const {
  createCommentService,
  getArticleCommentsService,
  deleteCommentService,
  getAllCommentsService,
} = require('./comments.service');

const createComment = async (req, res, next) => {
  const data = req.body;
  const userId = req.user.id;
  const { articleId } = req.params;

  try {
    const createdComment = await createCommentService(data, userId, articleId);

    res.status(201).json({
      message: 'Comment created successfully',
      data: createdComment,
    });
  } catch (error) {
    console.error('Error creating article:', error);
    return next(error);
  }
};

const getArticleComments = async (req, res, next) => {
  const { articleId } = req.params;
  try {
    const comments = await getArticleCommentsService(articleId);
    res.status(200).json({
      message: 'Article comments fetched successfully',
      data: comments,
    });
  } catch (error) {
    console.error('Error fetching article comments:', error);
    return next(error);
  }
};

const deleteArticleComment = async (req, res, next) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await deleteCommentService(commentId);
    if (deletedComment) {
      res.status(200).send('Comment is deleted');
      console.log(deletedComment);
    } else {
      res.status(404).send('Comment not found');
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    return next(error);
  }
};

const getAllComments = async (req, res, next) => {
  try {
    const allComments = await getAllCommentsService();
    res.status(200).json(allComments);
  } catch (error) {
    console.error('Error fetching all comments:', error);
    return next(error);
  }
};
module.exports = {
  createComment,
  getArticleComments,
  deleteArticleComment,
  getAllComments,
};
