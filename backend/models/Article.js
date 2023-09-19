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
    favorited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    favoritesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Article.associate = (models) => {
    Article.belongsTo(models.Profile, {
      foreignKey: 'author',
      as: 'Profile',
    });
    Article.belongsTo(models.Taglist, {
      foreignKey: 'tagList',
      as: 'Taglist',
    });
  };

  return Article;
};
