const {
  createArticleService,
  getAllArticlesService,
  getSingleArticleService,
  toggleLikeOnPostService,
  toggleUnlikeOnPostService,
  allLikesService,
  updateArticleFavoritesCountService,
} = require('./articles.service');

const createArticle = async (req, res, next) => {
  const data = req.body;
  const userId = req.user.id;

  try {
    const createdArticle = await createArticleService(data, userId);

    res.status(201).json({
      message: 'Article created successfully',
      data: createdArticle,
    });
  } catch (error) {
    console.error('Error creating article:', error);
    return next(error);
  }
};

const getAllArticles = async (req, res, next) => {
  try {
    const articles = await getAllArticlesService();
    res.status(201).json({
      message: 'Articles fetched successfully',
      data: articles,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const getSingleArticle = async (req, res, next) => {
  const { articleId } = req.params;
  try {
    const articles = await getSingleArticleService(articleId);
    res.status(201).json({
      message: 'Article fetched successfully',
      data: articles,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// TOGGLE LIKE
const toggleLikesOfPost = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { id } = req.user;

    const post = await toggleLikeOnPostService({ articleId, id });

    res.json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// TOGGLE UNLIKE
const toggleUnlikesOfPost = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { id } = req.user;

    const post = await toggleUnlikeOnPostService({ articleId, id });

    res.json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// GET ALL ARTICLE FAVORITES FOR LOGGEDIN USER
const allLikes = async (req, res, next) => {
  try {
    const { id } = req.user;

    // Find all article favorites for the logged-in user
    const userLikes = await allLikesService(id);

    // Send the user's likes as a response
    res.json({
      status: 'success',
      data: userLikes,
    });
  } catch (error) {
    console.error('Error fetching user likes:', error);
    return next(error);
  }
};

// UPDATE FAVORITES COUUNTS TABLE
const updateArticleFavoritesCount = async (req, res, next) => {
  const { articleId } = req.params;
  try {
    const result = await updateArticleFavoritesCountService(articleId);

    return res.status(200).json({ result });
  } catch (error) {
    console.error('Controller Error:', error);
    return next(error);
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getSingleArticle,
  toggleLikesOfPost,
  toggleUnlikesOfPost,
  allLikes,
  updateArticleFavoritesCount,
};
