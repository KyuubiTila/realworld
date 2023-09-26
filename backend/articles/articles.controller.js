const {
  createArticleService,
  getAllArticlesService,
  getSingleArticleService,
} = require('./articles.service');

const createArticle = async (req, res) => {
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
    res.status(500).json({
      error: 'Article creation failed',
    });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await getAllArticlesService();
    res.status(201).json({
      message: 'Articles fetched successfully',
      data: articles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error fetching articles.',
    });
  }
};

const getSingleArticle = async (req, res) => {
  const { articleId } = req.params;
  try {
    const articles = await getSingleArticleService(articleId);
    res.status(201).json({
      message: 'Article fetched successfully',
      data: articles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error fetching articles.',
    });
  }
};

module.exports = { createArticle, getAllArticles, getSingleArticle };
