const db = require('../models');
const Article = db.Article;
const Users = db.Users;
const Profile = db.Profile;
const ArticleFavourite = db.ArticleFavourite;

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

const toggleLikeOnPostService = async ({ articleId, id }) => {
  const userId = id;
  try {
    const post = await Article.findOne({ where: { id: articleId } });

    if (!post) {
      throw new Error('Post not found');
    }

    const isLiked = await ArticleFavourite.findOne({
      where: {
        profileId: userId,
        articleId: articleId,
      },
    });

    if (isLiked) {
      throw new Error('Post is liked');
    }

    if (!isLiked) {
      // Add user's like

      await ArticleFavourite.create({
        articleId,
        profileId: userId,
      });
    }

    await post.reload();

    return post;
  } catch (error) {
    if (error.message === 'Post not found') {
      throw new Error('Post not found');
    } else if (error.message === 'Post is liked') {
      throw new Error('Post is liked');
    } else {
      throw new Error('Error toggling like on post');
    }
  }
};

const toggleUnlikeOnPostService = async ({ articleId, id }) => {
  const userId = id;
  try {
    const post = await Article.findOne({ where: { id: articleId } });

    if (!post) {
      throw new Error('Post not found');
    }

    const isLiked = await ArticleFavourite.findOne({
      where: {
        profileId: userId,
        articleId: articleId,
      },
    });

    if (!isLiked) {
      throw new Error('Post is not liked');
    }

    if (isLiked) {
      // Remove user's like

      await ArticleFavourite.destroy({
        where: { articleId, profileId: userId },
      });
    }

    await post.reload();

    return post;
  } catch (error) {
    if (error.message === 'Post not found') {
      throw new Error('Post not found');
    } else if (error.message === 'Post is not liked') {
      throw new Error('Post is not liked');
    } else {
      throw new Error('Error toggling like on post');
    }
  }
};
module.exports = {
  createArticleService,
  getAllArticlesService,
  getSingleArticleService,
  toggleLikeOnPostService,
  toggleUnlikeOnPostService,
};
