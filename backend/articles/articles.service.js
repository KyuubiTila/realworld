const db = require('../models');
const Article = db.Article;
const Users = db.Users;

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

module.exports = {
  createArticleService,
};
