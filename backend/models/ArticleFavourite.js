module.exports = (sequelize, DataTypes) => {
  const ArticleFavourite = sequelize.define('ArticleFavourite', {});

  ArticleFavourite.associate = (models) => {
    ArticleFavourite.belongsTo(models.Profile, {
      foreignKey: 'profileId',
      as: 'Profile',
    });
    ArticleFavourite.belongsTo(models.Article, {
      onDelete: 'cascade',
      foreignKey: 'articleId',
    });
  };
  return ArticleFavourite;
};
