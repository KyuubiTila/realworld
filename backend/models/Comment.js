module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Profile, {
      foreignKey: 'author',
      as: 'Profile',
    });

    Comment.belongsTo(models.Article, {
      foreignKey: 'articleId',
      as: 'Article',
    });
  };

  return Comment;
};
