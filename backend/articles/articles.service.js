const db = require('../models');
const Article = db.Article;
const Users = db.Users;
const Profile = db.Profile;

const createArticleService = async (data, userId) => {
  const { slug, title, description, body, taglist } = data;
  const id = userId;
  try {
    const createdArticle = await Article.create({
      slug: slug,
      title: title,
      description: description,
      body: body,
      author: id,
      taglist: taglist,
    });

    return createdArticle;
  } catch (error) {
    console.error('Error creating article:', error);
    throw new Error('Article creation failed');
  }
};

const getAllArticlesService = async () => {
  try {
    const articles = await Article.findAll({
      include: [
        {
          model: Profile,
          as: 'Profile',
          attributes: ['bio', 'image', 'following'],
          include: [
            {
              model: Users,
              as: 'User',
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('Failed to fetch articles');
  }
};

const getSingleArticleService = async (articleId) => {
  try {
    console.log(articleId);
    const article = await Article.findOne({
      where: { id: articleId },
      include: [
        {
          model: Profile,
          as: 'Profile',
          attributes: ['bio', 'image', 'following'],
          include: [
            {
              model: Users,
              as: 'User',
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    return article;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw new Error('Failed to fetch article');
  }
};

module.exports = {
  createArticleService,
  getAllArticlesService,
  getSingleArticleService,
};
