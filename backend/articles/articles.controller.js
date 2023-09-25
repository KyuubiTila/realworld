const { createArticleService } = require('./articles.service');

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

module.exports = { createArticle };
