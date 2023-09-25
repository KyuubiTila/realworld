module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taglist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favoritesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  Article.associate = (models) => {
    Article.belongsTo(models.Profile, {
      foreignKey: 'author',
      as: 'Profile',
    });

    Article.hasOne(models.ArticleFavourite, {
      onDelete: 'cascade',
      foreignKey: 'articleId',
    });
  };

  return Article;
};
